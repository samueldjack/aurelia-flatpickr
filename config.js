System.config({
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0",
    "flatpickr": "npm:flatpickr@2.3.7",
    "npm:aurelia-polyfills@1.0.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0"
    },
    "npm:flatpickr@2.3.7": {
      "css": "github:systemjs/plugin-css@0.1.32"
    }
  }
});
