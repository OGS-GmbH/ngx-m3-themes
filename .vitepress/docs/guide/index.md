# Getting started

## Installation

Install `@ogs-gmbh/ngx-m3-themes` using your preferred package manager:

::: code-group
```bash [npm]
npm install @ogs-gmbh/ngx-m3-themes
```
```bash [yarn]
yarn add @ogs-gmbh/ngx-m3-themes
```
```bash [pnpm]
pnpm install @ogs-gmbh/ngx-m3-themes
```
:::

## Quick Start

Import the theme in your Angular application's global styles file:

```scss
// styles.scss
@use '@ogs-gmbh/ngx-m3-themes' as m3;

// Apply a pre-built theme
@include m3.light-theme();

// Or create a custom theme
$custom-theme: m3.define-theme((
  color: (
    primary: #6750a4,
    secondary: #625b71,
  )
));

@include m3.apply-theme($custom-theme);
```

Configure your Angular Material components:

```typescript
// app.config.ts
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    // other providers...
  ]
};
```

## 🎨 What's Inside?

The library provides a comprehensive theming solution for Angular Material 3 applications.\
When integrated, it enables consistent, modern UI styling across your entire application.

Current features include:

### **Pre-built Themes**

Ready-to-use Material 3 themes: 
- `light-theme` — clean, modern light mode styling
- `dark-theme` — sophisticated dark mode appearance
- Easy theme switching support

### **Custom Theme Builder**

Powerful theming utilities such as:
- `define-theme` — create custom themes with your brand colors
- `apply-theme` — apply themes consistently across components
- Full Material 3 Design System compatibility

### **SCSS Utilities**

Helper mixins and functions for:
- Typography systems
- Spacing utilities
- Color palette management
- Responsive breakpoints *(Coming soon)*
