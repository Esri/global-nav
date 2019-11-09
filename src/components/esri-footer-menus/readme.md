# global-nav-

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                                                                 | Type           | Default |
| -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------- |
| `label`  | `label`   | Be sure to add a jsdoc comment describing your propery for the generated readme file. If your property should be hidden from documentation, you can use the `@internal` tag | `string`       | `""`    |
| `menu`   | --        |                                                                                                                                                                             | `FooterMenu[]` | `[]`    |


## Events

| Event  | Description | Type               |
| ------ | ----------- | ------------------ |
| `open` |             | `CustomEvent<any>` |


## Methods

### `doThing() => Promise<void>`

Add a jsdoc comment describing your method and it's parameters (use `@param`).

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [esri-footer](../esri-footer)

### Graph
```mermaid
graph TD;
  esri-footer --> esri-footer-menus
  style esri-footer-menus fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
