import createMenu from './list.js';

export default class GlobNav {
	// default Site CDN
	static defaultSiteCDN = '/assets/site.json';

	// default User CDN
	static defaultUserCDN = '/assets/user.json';

	// default Site URL
	static defaultSiteURL = '/assets/site.json';

	// default User URL
	static defaultUserURL = '/assets/user.json';

	// default Site Object
	static defaultSiteObject = {
		branding: {
			href:  '//esri.com',
			image: '/assets/logo.svg'
		},
		navigation: [
			{
				label: 'Main Item',
				href:  '//esri.com'
			}
		],
		labels: {
			search: ''
		}
	};

	// default User Object
	static defaultUserObject = {
		account: {},
		apps:    [{
			label: 'Some App',
			href:  '//esri.com',
			image: '//placehold.it/32x32'
		}]
	};

	static defaultClassNames = {
		main: 'globnav',
		list: 'globnav-list',
		item: 'globnav-item',
		link: 'globnav-link',
		menu: 'globnav-menu',
		img:  'globnav-image'
	};

	// Import Site Details from a CDN
	static importSiteFromCDN() {
		return GlobNav.importSiteFromURL(GlobNav.defaultSiteCDN);
	}

	// Import Site Details from a URL
	static importSiteFromURL(siteURL = GlobNav.defaultSiteURL) {
		return fetch(siteURL).then((response) => response.json()).then(GlobNav.importSiteFromObject);
	}

	// Import Site Details from an Object
	static importSiteFromObject({
		branding   = GlobNav.defaultSiteObject.branding,
		navigation = GlobNav.defaultSiteObject.navigation,
		labels     = GlobNav.defaultSiteObject.labels
	}) {
		return {
			branding,
			navigation,
			labels
		};
	}

	// Import Site Details from a CDN
	static importUserFromCDN() {
		return GlobNav.importUserFromURL(GlobNav.defaultUserCDN);
	}

	// Import Site Details from a URL
	static importUserFromURL(userURL = GlobNav.defaultUserURL) {
		return fetch(userURL).then((response) => response.json()).then(GlobNav.importUserFromObject);
	}

	// Import Site Details from an Object
	static importUserFromObject({
		account = GlobNav.defaultUserObject.account,
		apps    = GlobNav.defaultUserObject.apps
	}) {
		return {
			account,
			apps
		};
	}

	static constructNavigationDOM(navigation, isChild) {
		return createMenu(navigation, GlobNav.defaultClassNames, false);

		// const div = document.createElement('div');

		// div.classList.add(isChild ? GlobNav.defaultClassNames.child : GlobNav.defaultClassNames.main);

		// const ul = div.appendChild(document.createElement('ul'));

		// ul.classList.add(GlobNav.defaultClassNames.list);

		// ul.append(...navigation.map(
		// 	(item) => {
		// 		const li = document.createElement('li');

		// 		li.classList.add(GlobNav.defaultClassNames.item);

		// 		let label;

		// 		if (item.image) {
		// 			label = li.appendChild(document.createElement('img'));

		// 			label.classList.add(GlobNav.defaultClassNames.image);

		// 			img.src = item.image;

		// 			img.setAttribute('alt', item.label);
		// 		} else {
		// 			label = item.label;
		// 		}

		// 		if (item.href) {
		// 			const a = li.appendChild(document.createElement('a'));

		// 			a.classList.add(GlobNav.defaultClassNames.link);

		// 			a.href = item.href;

		// 			a.append(label);
		// 		} else {
		// 			li.append(label);
		// 		}

		// 		if (item.children) {
		// 			a.setAttribute('[aria-controls]');

		// 			li.append(GlobNav.constructNavigationDOM(item.children, true));
		// 		}

		// 		return li;
		// 	}
		// ));

		// return div;
	}
}
