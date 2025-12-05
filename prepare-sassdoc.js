import data from "./sassdoc.json" with { type: "json" };
import fs from "node:fs/promises";

const groups = new Set([]);
const sortedData = {};

// Getting the different groups
for (const element of data)
  if (!groups.has(element.group[ 0 ])) groups.add(element.group[ 0 ]);


// Sort the data by group
for (const section of groups)
  sortedData[ section ] = [];

for (const element of data)
  sortedData[ element.group[ 0 ] ].push(element);


// Create the modules list - The list of all the groups
const modulesList = [ ...groups ]
  .map((name) => `- [${ name }](modules/${ name }.md)`)
  .join("\n");
const commentsLandingPage = `
# Reference

## Modules

${ modulesList }
`;

// Create needed directory asynchronously
await fs.mkdir('dist/sassdoc', { recursive: true });
await fs.cp('./.vitepress/docs', './dist/sassdoc', {
  recursive: true
});
await fs.mkdir('dist/sassdoc/reference', { recursive: true });
await fs.mkdir('dist/sassdoc/reference/modules', { recursive: true });
await fs.mkdir('dist/sassdoc/reference/functions', { recursive: true });
// Write landing page
await fs.writeFile('dist/sassdoc/reference/index.md', commentsLandingPage);

// Create the function list - These are all the functions that are present in a module
for (const section in sortedData) {
  const functionList = sortedData[ section ]
    .filter((element) => element.context.type === "function")
    .map((element) => `- [${ element.context.name }](/reference/functions/${ element.group }.${ element.context.name }.md)`)
    .join("\n");
  const variableList = sortedData[ section ]
    .filter((element) => element.context.type === "variable")
    .map((element) => `- [${ element.context.name }](/reference/functions/${ element.group }.${ element.context.name }.md)`)
    .join("\n");
  const functionSummary = `
# ${ section }

## Functions

${ functionList }


${ variableList.length

    ? `
## Variables

${ variableList }
`
    : ""

}

`;

  await fs.writeFile(`dist/sassdoc/reference/modules/${ section }.md`, functionSummary);


  // Create the file for each function
  for (const sec of sortedData[ section ]) {
    const parametersTable = sec.parameter && sec.parameter.length > 0
      ? `## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
${ sec.parameter.map((param) => `| \`${ param.name }\` | \`${ param.type }\` | ${ param.description } |`).join('\n') }
`
      : '';
    const paramsList = sec.parameter && sec.parameter.length > 0
      ? sec.parameter.map((p) => p.name).join(', ')
      : '';
    const codeSignature = `\`\`\`ts
function ${ sec.context.name }(${ paramsList }): ${ sec[ "return" ]?.type || 'void' };
\`\`\``;
    const filePath = sec.file?.path ? sec.file.path.replaceAll('\\', '/') : '';
    const fileLink = filePath
      ? `Defined in: [${ filePath }:${ sec.context.line.start }](https://github.com/YOUR-ORG/YOUR-REPO/blob/main/src/${ filePath }#L${ sec.context.line.start })`
      : '';
    const linksSection = sec.link && sec.link.length > 0
      ? `## See Also

${ sec.link.map((link) => `- [${ link.caption || link.url }](${ link.url })`).join('\n') }
`
      : '';
    const usedBySection = sec.usedBy && sec.usedBy.length > 0
      ? `## Used By

${ sec.usedBy.map((usage) => `- \`${ usage.context.name }\` - ${ usage.description.trim() }`).join('\n') }
`
      : '';
    const functionPage = `# ${ sec.context.name }()

${ codeSignature }

${ fileLink }

${ sec.description.trim() }

${ parametersTable }


${ sec.context.type === "function"

    ? `
## Returns

\`${ sec[ "return" ]?.type || 'void' }\`

${ sec[ "return" ]?.description || '' }

`
    : ""
}


${ linksSection }${ usedBySection }
## Author

${ sec.author ? sec.author.join(', ') : 'Unknown' }
`;

    await fs.writeFile(`dist/sassdoc/reference/functions/${ section }.${ sec.context.name }.md`, functionPage);
  }
}

