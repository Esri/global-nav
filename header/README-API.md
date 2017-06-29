# API

Global Navigation emits events during user interaction to help you manage state:

- Events are prefixed with `gnav:`
- Events bubble up to the `window`
- Events dispatch from the deepest possible element

### header:load

The `gnav:load` event happens when `gnav.create()` has finished executing.

```js
window.addEventListener('gnav:load', ({ target }) => {});
```

### gnav:signin

The `gnav:signin` event happens when a user is being signed in. This activates
the signed-in view of the account section and updates the UI using the user’s
`name`, `id`, `group`, and `image`.

```js
// listen for signin events
window.addEventListener('gnav:signin', ({ target, detail: { name, id, group, image } }) => {});
```

```js
// trigger a signin event
target.dispatchEvent(new CustomEvent('gnav:signin', detail: { name, id, group, image }));
```

### gnav:signout

The `gnav:signout` event happens when a user is being signed out. This
activates the signed-out view of the account section, deactivating the
signed-in view.

```js
// listen for signout events
window.addEventListener('gnav:signout', ({ target, detail: { control, content } }) => {});
```

```js
// trigger a signout event
target.dispatchEvent(new CustomEvent('gnav:signout', { detail: { control, content } }));
```

---

### Click Events

#### gnav:click:brand

The `gnav:click:brand` event happens when the brand logo is clicked.

```js
// listen for brand click events
window.addEventListener('gnav:click:brand', ({ target, detail: { event } }) => {});
```

```js
// trigger a brand click event
target.dispatchEvent(new CustomEvent('gnav:click:brand'));
```

#### gnav:click:search

The `gnav:click:search` event happens when the search button is clicked.

```js
// listen for search click events
window.addEventListener('gnav:click:search', ({ target, detail: { event } }) => {});
```

```js
// trigger a search click event
target.dispatchEvent(new CustomEvent('gnav:click:search'));
```

### click:signin

The `click:signin` event happens when the signin button is clicked.

```js
// listen for signin click events
window.addEventListener('gnav:signin', ({ target, detail: { event } }) => {});
```

```js
// trigger a signin click event
target.dispatchEvent(new CustomEvent('gnav:click:signin'));
```

#### gnav:click:signout

The `gnav:click:signout` event happens when the signout button is clicked.

```js
// listen for signin click events
window.addEventListener('gnav:signout', ({ target, detail: { event } }) => {});
```

```js
// trigger a signin click event
target.dispatchEvent(new CustomEvent('gnav:click:signout'));
```

#### gnav:click:app

The `gnav:click:app` event happens when an `app` button is clicked.

```js
window.addEventListener('gnav:click:app', ({ target, detail: { event } }) => {});
```

```js
target.dispatchEvent(new CustomEvent('gnav:click:app'));
```

---

### Menu Events

#### header:menu:toggle

#### header:menu:open

The `menu:open` event occurs whenever a menu is being opened, which might
include the main menu, the apps menu, or the account menu.

Clicking a closed menu control triggers a `menu:open` event.

```js
window.addEventListener('gnav:menu:open', ({ target, detail: { control, content } }) => {});
```

```js
target.dispatchEvent(new CustomEvent('gnav:menu:open', detail: { control, content }));
```

#### header:menu:close

The `menu:close` event occurs whenever a menu is being closed, which might
include the main menu, the apps menu, or the account menu.

Clicking a opened menu control triggers a `menu:close` event. Clicking a closed
menu while another menu is open triggers a `menu:close` event from that first
opened menu.

```js
window.addEventListener('gnav:menu:close', ({ target, detail: { control, content } }) => {});
```

```js
target.dispatchEvent(new CustomEvent('gnav:menu:close', detail: { control, content }));
```

### header:menu:closeall

The `menu:closeall` event occurs whenever all menus have closed explicitly,
which includes the main menu, the apps menu, or the account menu.

Pressing escape or clicking the shadow canvas triggers a `closeall` event.

```js
window.addEventListener('gnav:menu:closeall') => {});
```

```js
target.dispatchEvent(new CustomEvent('gnav:menu:closeall'));
```
