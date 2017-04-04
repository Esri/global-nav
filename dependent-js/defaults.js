export default {
	className: {
		main: 'globnav',
		list: 'globnav-list',
		item: 'globnav-item',
		link: 'globnav-link',
		menu: 'globnav-menu',
		img: 'globnav-image'
	},
	siteCDN: '/assets/site.json',
	siteURL: '/assets/site.json',
	siteObject: {
		branding: {
			color: '#ff0000',
			href: '//esri.com',
			image: '/assets/logo.svg'
		},
		navigation: [],
		labels: {
			search: 'Search'
		}
	},
	userCDN: '/assets/site.json',
	userURL: '/assets/site.json',
	userObject: {
		account: {
			image: '//placehold.it/defaultUserImage.png'
		},
		apps: [
			{
				label: 'Some App',
				href: '//esri.com',
				image: '//placehold.it/32x32'
			}
		]
	}
};
