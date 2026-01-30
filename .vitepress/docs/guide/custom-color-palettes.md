# Custom Color Palettes

## Meaning

Since Angular Material only supports three palettes in total for each theme, it can be difficult to extend your design system by additional palettes (e.g. `warning`, `success`).

We provide an extension to use custom palettes while being conform to Angular Material and it's [specification](https://m3.material.io/styles/color/roles). Every provided custom palette will be used to generate Material 3 [color system tokens](https://material.angular.dev/guide/theming-your-components#colors).

Imagine of a [custom color palette](https://material.angular.dev/guide/theming#custom-color-palettes) `success` (used from [OGSiD® 11 Theme](https://github.com/OGS-GmbH/ogsid-11-theme/blob/v1.0.0/src/palettes/_green.scss)) with all required hues for Angular Material:

```scss [_success-palette.scss]
$success-palette: (
  0: #000000,
  10: #002D29,
  20: #003C36,
  25: #004741,
  30: #005A52,
  35: #006B62,
  40: #00786D,
  50: #009688,
  60: #4CC0B5,
  70: #73D5CC,
  80: #86DFD7,
  90: #99EAE2,
  95: #BFFFF9,
  98: #E0FFFC,
  99: #F1FDFC,
  100: #FFFFFF
);
```

The following tokens will be generated for custom palette `success` in light mode:

```css
--mat-sys-success: #00786D;
--mat-sys-on-success: #FFFFFF;
--mat-sys-success-container: #99EAE2;
--mat-sys-on-success-container: #005A52;
--mat-sys-success-fixed: #99EAE2;
--mat-sys-on-success-fixed: #002D29;
--mat-sys-on-success-fixed-variant: #005A52;
--mat-sys-success-fixed-dim: #86DFD7;
```

## Usage

To improve the understanding, we use the `success` custom color palette from [OGSiD® 11 Theme](https://github.com/OGS-GmbH/ogsid-11-theme/blob/v1.0.0/src/palettes/_green.scss).

Mixin `ngx-m3-themes.theme()` needs to be used, since Angular Material's `mat.theme()` will throw an error and complains about your custom color palette.

```scss [global.scss]
@use "@angular/material" as mat;
@use "@ogs-gmbh/ngx-m3-themes";
@use "./success-palette.scss";

html {
  @include ngx-m3-themes.theme((
    color: (
      primary: mat.$azure-palette,
      tertiary: mat.$blue-palette,
      success: $success-palette
    ),
    typography: Roboto,
    density: 0,
  ));
}
```

Make sure to add `global.scss` (or your theming file) to the [extra build options](https://angular.dev/reference/configs/workspace-config#extra-build-and-test-options) in your `angular.json`.
Now you're able to use the system color tokens in your desired component:

```ts [example.component.ts]
@Component({
  template: `
    <div class="container">
      <h1 class="headline">My Example Component</h1>
    </div>
  `,
  styles: `
    .container {
      background-color: var(--mat-sys-success-container);
    }

    .headline {
      color: var(--mat-sys-on-success-container);
    }
  `
})
export class ExampleComponent {}
```
