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
{
  "label": "visible label",
  "href":  "//domain/path/to/destination",
  "menus": [ ... ]
}
```

### GlobNav Search

| Element | Uses | From | Required | Restrictions |
|:------- |:---- |:----:|:--------:|:------------:|
| label | plain text    | input text | • | 1  |

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

- `label` is used to display the “Sign In” text.

[GlobNav]: #globnav
[GlobNav Brand]: #globnav-brand
[GlobNav Menus]: #globnav-menus
[GlobNav Search]: #globnav-search
[GlobNav Account]: #globnav-account
