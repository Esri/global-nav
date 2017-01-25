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
  "label": "hidden accessible label",
  "image": "//domain/path/to/image",
  "href":  "//domain/path/to/destination"
}
```

### GlobNav Menus

| Element | Uses | From | Required | Restrictions |
|:------- |:---- |:----:|:--------:|:------------:|
| label | plain text      | input text | • | 1  |
| href  | url             | input url  |   | 1  |
| menus | [GlobNav Menus] | -          |   | 1+ | 

```json
[
  {
    "label": "visible label",
    "href":  "//domain/path/to/destination",
    "menus": [ ... ]
  },
  { ... }
],
[
  {
    "label": "a second navigation",
    "href":  "//domain/path/to/destination"
  },
  { ... }
]
```

### GlobNav Search

| Element | Uses | From | Required | Restrictions |
|:------- |:---- |:----:|:--------:|:------------:|
| label | plain text | input text | • | 1 |

```json
{
  "label": "hidden accessible label"
}
```

### GlobNav Account

| Element | Uses | From | Required | Restrictions |
|:------- |:---- |:----:|:--------:|:------------:|
| label  | plain text | input text | • | 1 |
| name   | plain text | input text | • | 1 |
| id     | plain text | input text | • | 1 |
| avatar | image url  | input url  | • | 1 |

- `label` is used to display the “*Login*” text.

## GlobNav Events

This section details the events emitted by Global Navigation component during user interaction. All events are prefixed with `esriglobnav:` (e.g. `esriglobnav:click`).

### `click`

Returns the element within the global nav that is clicked.

```js
addEventListener(
  'esriglobnav:click',
  (event.target) => console.log('clicked:', event.target)
)
```

### `click:login`

Returns the login element within the global nav that is clicked.

```js
addEventListener(
  'esriglobnav:login',
  (event.target) => console.log('clicked login:', event.target)
)
```

### `click:menu`

Returns the menu element within the global nav that is clicked.

```js
addEventListener(
  'esriglobnav:menu',
  (event.target) => console.log('clicked menu:', event.target)
)
```

### `expand`

Returns the element within the global nav that has triggered an expand.

```js
addEventListener(
  'esriglobnav:expand',
  (event.target) => console.log('expand from:', event.target)
)
```

### `expanded`

Returns the element within the global nav that has been expanded.

```js
addEventListener(
  'esriglobnav:expanded',
  (event.target) => console.log('expanded element:', event.target)
)
```

[GlobNav]: #globnav
[GlobNav Brand]: #globnav-brand
[GlobNav Menus]: #globnav-menus
[GlobNav Search]: #globnav-search
[GlobNav Account]: #globnav-account
