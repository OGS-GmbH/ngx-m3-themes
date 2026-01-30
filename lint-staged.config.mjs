export default {
  "*.{ts,js,mjs,cjs,md,json,json5,jsonc}": "eslint",
  "package.json": "npmPkgJsonLint -c ./node_modules/@ogs-gmbh/linter/package-json-open-source.rules.json"
};

