import $ from './create-element';

import $brand from './lib/brand';

import $menus from './lib/menus';

import $user from './lib/user';

import $search from './lib/search';

export default function () {
	document.body.appendChild(
		$( 'div', { class: 'esri-gnav' }, [].concat(
			data.brand ? $brand(data.brand) : [],
			data.menus && data.menus.length ? $menus(data.menus) : [],
			data.search ? $search(data.search) : [],
			data.apps || data.user ? $user(data.apps, data.user) : []
		))
	);
}

// 760 bytes without dummy data

const data = {
	"brand": {
		"label": "Esri",
		"image": "assets/gnav.svg#logo",
		"href": "#brand"
	},
	"menus": [
		[
			{
				"label": "ArcGIS",
				"href": "#1",
				"menus": [
					{
						"label": "ArcGIS Child 1",
						"href": "#1-1"
					},
					{
						"label": "ArcGIS Child 2",
						"href": "#1-2"
					},
					{
						"label": "ArcGIS Child 3",
						"href": "#1-3"
					}
				]
			},
			{
				"label": "Industries",
				"href": "#2"
			},
			{
				"label": "About",
				"href": "#3"
			},
			{
				"label": "Support",
				"href": "#4"
			}
		],
		[
			{
				"label": "Special",
				"href": "#5"
			}
		]
	],
	"search": {
		"label": "Search"
	},
	"apps": {
		"label": "Applications"
	},
	"user": {
		"label": "Sign In",
		"avatar": "//placehold.it/64x64",
		"name": "JSON",
		"id": "json@data"
	}
};
