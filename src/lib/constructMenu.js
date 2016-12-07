// tooling
import defaults from './defaults';

const { className } = defaults;

// plugin
export default function constructMenu(entries, isChild) {
	const menu = document.createElement('div');

	menu.classList.add(isChild ? className.menu : className.main);

	const list = menu.appendChild(document.createElement('ul'));

	list.classList.add(className.list);

	entries.map(
		(entry, index) => {
			// ...
			const item = list.appendChild(document.createElement('li'));

			item.classList.add(className.item);

			// ...
			const link = item.appendChild(document.createElement('a'));

			link.classList.add(className.link);

			// ...
			const label = link.appendChild(entry.image ? document.createElement('img') : document.createTextNode(entry.label));

			// ...
			const linkId = [constructMenu.prefix, ++constructMenu.uuid, 'link'].join('-');
			const menuId = [constructMenu.prefix, ++constructMenu.uuid, 'menu'].join('-');

			// ...
			if (entry.image) {
				label.setAttribute('src', entry.image);
				label.setAttribute('alt', entry.label);

				label.classList.add(className.img);
			}

			// ...
			if (entry.children) {
				link.setAttribute('id', linkId);
				link.setAttribute('aria-controls', menuId);
				link.setAttribute('aria-expanded', false);
				link.setAttribute('aria-haspopup', true);

				// ...
				const submenu = item.appendChild(constructMenu(entry.children, true));

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
constructMenu.prefix = 'globnav';

// unique id
constructMenu.uuid = Date.now();
