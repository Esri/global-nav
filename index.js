import gnav from './js/gnav';

document.addEventListener(
	'DOMContentLoaded',
	() => gnav({
		brand: {
			label: "Esri",
			image: "assets/gnav.svg#logo",
			href: "#brand"
		},
		menus: [
			[
				{
					label: "ArcGIS",
					menus: [
						{
							label: "ArcGIS Child 1",
							href: "#1-1"
						},
						{
							label: "ArcGIS Child 2",
							href: "#1-2"
						},
						{
							label: "ArcGIS Child 3",
							href: "#1-3"
						}
					]
				},
				{
					label: "Industries",
					menus: [
						{
							label: "Industries 1",
							href: "#2-1"
						},
						{
							label: "Industries 2",
							href: "#2-2"
						},
						{
							label: "Industries 3",
							href: "#3-3"
						}
					]
				},
				{
					label: "About",
					href: "#3"
				},
				{
					label: "Support",
					menus: [
						{
							label: "Support 1",
							href: "#4-1"
						},
						{
							label: "Support 2",
							href: "#4-2"
						},
						{
							label: "Support 3",
							href: "#4-3"
						}
					]
				}
			],
			[
				{
					label: "Special",
					href: "#5"
				}
			]
		],
		search: {
			label: "Search"
		},
		apps: {
			label: "Applications"
		},
		user: {
			label: "Sign In",
			image: "//placehold.it/64x64",
			name: "JSON",
			id: "json@data"
		}
	})
);

// import GlobNav from './GlobNav';

// document.addEventListener('DOMContentLoaded', () => {
// 	GlobNav.importFrom.siteCDN().then(
// 		({ navigation }) => GlobNav.constructMenu(navigation)
// 	).then(
// 		(div) => document.body.append(div)
// 	);
// });
