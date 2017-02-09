# aurelia-flatpickr

This is an aurelia flatpickr plugin. Use as a custom element.

## Getting Started

Install from npm:

```shell
  npm install aurelia-flatpickr
  ```
In your application entry file:
```html
  export async function configure(aurelia) {
    aurelia.use
        .plugin('aurelia-flatpickr')
        ...
  }
  ```

Then use as a custom element anywhere throughout your application:
```html
  <aurelia-flatpickr config.bind="config" value.bind="value"></aurelia-flatpickr>
  ```
