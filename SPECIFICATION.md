# Global Navigation Component Specification

This document details the elements used to present the Global Navigation component.

## GlobNav

| Element | Uses | From | Required | Restrictions |
|:------- |:---- |:----:|:--------:|:------------:|
| brand   | [GlobNav Brand]   | - | | 1  |
| menus   | [GlobNav Menus]   | - | | 1+ |
| search  | [GlobNav Search]  | - | | 1  |
| account | [GlobNav Account] | - | | 1  |

```json
{
  "brand":   { ... },
  "menus":   [ ... ],
  "search":  { ... },
  "account": { ... }
}
```

- If `brand` is not specified, then it will not appear.
- If no `menus` are specified, then they will not appear.
- If `menus` contains more than one item, they will be visually justified.
- If `search` is not specified, then it will not appear.
- If `account` is not specified, then it will not appear.

### GlobNav Brand

| Element | Uses | From | Required | Restrictions |
|:------- |:---- |:----:|:--------:|:------------:|
| label | plain text | input text | • | 1 |
| image | image url  | input url  | • | 1 |
| href  | url        | input url  | | 1 |

```json
{
  "brand": {
    "label": "hidden accessible label",
    "image": "//domain/path/to/image",
    "href":  "//domain/path/to/destination"
  }
}
```

- If `brand` is not specified, then it will not appear.

### GlobNav Menus

| Element | Uses | From | Required | Restrictions |
|:------- |:---- |:----:|:--------:|:------------:|
| label | plain text      | input text | • | 1  |
| href  | url             | input url  |   | 1  |
| menus | [GlobNav Menus] | -          |   | 1+ | 

```json
{
  "menus": [
    [
      {
        "label": "visible item name",
        "href":  "/path/to/destination"
      },
      { ... }
    ],
    [
      {
        "label": "secondary navigation",
        "href":  "/path/to/destination",
        "menus": [
          {
            "label": "child item",
            "href":  "/path/to/destination"
          },
          ...
        ]
      },
      { ... }
    ]
  ]
}
```

- If no `menus` are specified, then they will not appear.
- If `menus` contains more than one item, they will be visually justified.
- While `menus` may nest infinitly, only the top and child items will be used.

### GlobNav Search

| Element | Uses | From | Required | Restrictions |
|:------- |:---- |:----:|:--------:|:------------:|
| label | plain text | input text | • | 1 |
| image | image url  | input url  | • | 1 |

```json
{
  "search": {
    "label": "hidden accessible label"
    "image": "/path/to/image"
  }
}
```

- If `search` is not specified, then it will not appear.
- `image` may also be the hash id (e.g. `#search`) to the bundled globnav icon.

### GlobNav Account

| Element | Uses | From | Required | Restrictions |
|:------- |:---- |:----:|:--------:|:------------:|
| label  | plain text | input text | • | 1 |
| name   | plain text | input text | • | 1 |
| id     | plain text | input text | • | 1 |
| avatar | image url  | input url  | • | 1 |

```json
{
  "account": {
    "label":  "Sign In"
    "name":   "Bruce Campbell",
    "id":     "GroovyBruce",
    "avatar": "/path/to/avatar"
  }
}
```

- If `account` is not specified, then it will not appear.
- `label` is used to display the “*Login*” text.

---

## GlobNav Events

This section details the events emitted by Global Navigation component during user interaction.

- Events are prefixed with `esriglobnav:`.
- Events bubble up to the window.
- Events `target` is the deepest applicable element
- Events `currentTarget` is the components outermost container.

### `click`

Returns the element within the global nav that is clicked.

```js
addEventListener(
  'esriglobnav:click',
  (event) => console.log('clicked:', event.target)
)
```

### `click:login`

Returns the login element within the global nav that is clicked.

```js
addEventListener(
  'esriglobnav:login',
  (event) => console.log('clicked login:', event.target)
)
```

### `click:menu`

Returns the menu element within the global nav that is clicked.

```js
addEventListener(
  'esriglobnav:menu',
  (event) => console.log('clicked menu:', event.target)
)
```

### `expand`

Returns the element within the global nav that has triggered an expand.

```js
addEventListener(
  'esriglobnav:expand',
  (event) => console.log('expand from:', event.target)
)
```

### `expanded`

Returns the element within the global nav that has been expanded.

```js
addEventListener(
  'esriglobnav:expanded',
  (event) => console.log('expanded element:', event.target)
)
```

[GlobNav]: #globnav
[GlobNav Brand]: #globnav-brand
[GlobNav Menus]: #globnav-menus
[GlobNav Search]: #globnav-search
[GlobNav Account]: #globnav-account
