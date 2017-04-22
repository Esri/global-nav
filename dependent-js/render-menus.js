// tooling
import $ from './lib/create-element';

// prefix
const prefix = 'esri-gnav-menus';

// render menus element
export default (menus) => $('div', { class: prefix, id: `${ prefix }` }, [
	$('button', {
		class: `${ prefix }-toggle`, id: `${ prefix }-toggle`,
		ariaControls: `${ prefix }-content`, ariaExpanded: false, ariaHaspopup: true
	}),
	$('div', {
		class: `${ prefix }-content`, id: `${ prefix }-content`,
		ariaHidden: true, ariaExpanded: false
	}, menus.map(
		(menu) => $('div', {
			class: `${ prefix }-menu`,
			role: 'group'
		}, [
			// top-level experience
			$('ul', {
				class: `${ prefix }-list`, id: `${ prefix }-list`,
				role: 'navigation'
			}, menu.map(
				(item) => $('li', { class: `${ prefix }-item` }, [
					$('a', Object.assign(
						{
							class: `${ prefix }-link`, id: `${ prefix }-link-${ ++uuid }`,
							href: item.href || 'javascript:;' // eslint-disable-line no-script-url
						},
						item.menus && item.menus.length ? {
							ariaControls: `${ prefix }-submenu-${ uuid }`, ariaExpanded: false, ariaHaspopup: true,
							dataRelated: `${ prefix }-content`
						} : {}
					), [
						document.createTextNode(item.label)
					])
				].concat(
					item.menus && item.menus.length || item.tiles && item.tiles.length ? $('div', {
						class: `${ prefix }-submenu`, id: `${ prefix }-submenu-${ uuid }`,
						role: 'group', ariaHidden: true, ariaExpanded: false,
						itemCount: `${ item.menus.slice(0, 16).length }`, itemFull: `${ item.menus.length > 6 }`
					}, [
						$('button', {
							class: `${ prefix }-submenu-toggle`,
							dataRelated: `${ prefix }-list`
						}, [
							document.createTextNode(item.label)
						])
					].concat(
						item.menus && item.menus.length ? [
							// sub-level experience
							$('ul', {
								class: `${ prefix }-sublist`,
								role: 'navigation', ariaLabelledby: `${ prefix }-${ uuid }`
							}, item.menus.slice(0, 16).map(
								(childitem) => $('li', { class: `${ prefix }-subitem` }, [
									$('a', { class: `${ prefix }-sublink`, id: `-${ ++uuid }`, href: childitem.href }, [
										document.createTextNode(childitem.label)
									])
								])
							))
						] : [],
						item.tiles && item.tiles.length ? [
							// sub-tile experience
							$('ul', {
								class: `${ prefix }-sublist--tiles`,
								role: 'navigation', ariaLabelledby: `${ prefix }-${ uuid }`
							}, item.tiles.slice(0, 3).map(
								(childitem) => $('li', { class: `${ prefix }-subitem--tiles` }, [
									$('a', { class: `${ prefix }-sublink--tiles`, id: `-${ ++uuid }`, href: childitem.href }, [
										$('svg', { class: `${ prefix }-sublink-image` }, [
											$('use', { 'href': childitem.icon })
										]),
										$('span', { class: `${ prefix }-sublink-text` }, [
											document.createTextNode(childitem.label)
										])
									])
								])
							))
						] : []
					)) : []
				))
			))
		])
	))
]);

// unique id initialized
let uuid = 0;
