# global-nav-

<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute                  | Description | Type                                                           | Default     |
| ------------------------ | -------------------------- | ----------- | -------------------------------------------------------------- | ----------- |
| `brandText`              | `brand-text`               |             | `string`                                                       | `undefined` |
| `distributorImage`       | `distributor-image`        |             | `string \| string[] \| { viewBox?: string; path: ImagePath; }` | `undefined` |
| `distributorImageHeight` | `distributor-image-height` |             | `string`                                                       | `undefined` |
| `distributorImageWidth`  | `distributor-image-width`  |             | `string`                                                       | `undefined` |
| `height`                 | `height`                   |             | `string`                                                       | `undefined` |
| `href`                   | `href`                     |             | `string`                                                       | `undefined` |
| `image`                  | `image`                    |             | `string \| string[] \| { viewBox?: string; path: ImagePath; }` | `undefined` |
| `label`                  | `label`                    |             | `string`                                                       | `undefined` |
| `width`                  | `width`                    |             | `string`                                                       | `undefined` |


## Dependencies

### Used by

 - [esri-header](../esri-header)

### Depends on

- [esri-image](../esri-image)

### Graph
```mermaid
graph TD;
  esri-header-brand --> esri-image
  esri-header --> esri-header-brand
  style esri-header-brand fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
