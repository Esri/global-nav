export default function createMenu(entries, classNames, isChild) {
	const menu = document.createElement('div');

	menu.classList.add(isChild ? classNames.menu : classNames.main);

	const list = menu.appendChild(document.createElement('ul'));

	list.classList.add(classNames.list);

	entries.map(
		(entry, index) => {
			// ...
			const item = list.appendChild(document.createElement('li'));

			item.classList.add(classNames.item);

			// ...
			const link = item.appendChild(document.createElement('a'));

			link.classList.add(classNames.link);

			// ...
			const label = link.appendChild(entry.image ? document.createElement('img') : document.createTextNode(entry.label));

			// ...
			const linkId = [createMenu.prefix, ++createMenu.uuid, 'link'].join('-');
			const menuId = [createMenu.prefix, ++createMenu.uuid, 'menu'].join('-');

			// ...
			if (entry.image) {
				label.setAttribute('src', entry.image);
				label.setAttribute('alt', entry.label);

				label.classList.add(classNames.img);
			}

			// ...
			if (entry.children) {
				link.setAttribute('id', linkId);
				link.setAttribute('aria-controls', menuId);
				link.setAttribute('aria-expanded', false);
				link.setAttribute('aria-haspopup', true);

				// ...
				const submenu = item.appendChild(createMenu(entry.children, classNames, true));

				// ...
				submenu.setAttribute('id', menuId);
				submenu.setAttribute('aria-expanded', false);
				submenu.setAttribute('aria-hidden', true);
				submenu.setAttribute('aria-labelledby', linkId);
			}
		}
	);

	return menu;
}

// prefix
createMenu.prefix = 'globnav';

// unique id
createMenu.uuid = Date.now();
