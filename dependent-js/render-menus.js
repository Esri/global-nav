// tooling
import $ from './lib/create-element';

// prefix
const prefix = 'esri-gnav-menus';

// render menus element
export default (menus) => $('div', { class: prefix }, menus.map(
	(menu) => $('div', {
		class: `${ prefix }-menu`,
		role: 'group'
	}, [
		// top-level experience
		$('ul', {
			class: `${ prefix }-list`,
			role: 'navigation'
		}, menu.map(
			(item) => $('li', { class: `${ prefix }-item` }, [
				$('a', Object.assign(
					{
						class: `${ prefix }-link`,
						id: `${ prefix }-link-${ ++uuid }`,
						href: item.href || 'javascript:;',
					},
					item.menus && item.menus.length ? {
						ariaControls: `${ prefix }-submenu-${ uuid }`,
						ariaExpanded: false,
						ariaHaspopup: true
					} : {}
				), [
					document.createTextNode(item.label)
				])
			].concat(
				item.menus && item.menus.length ? $('div', {
					class: `${ prefix }-submenu`,
					id: `${ prefix }-submenu-${ uuid }`,
					role: 'group',
					ariaHidden: true,
					ariaExpanded: false
				}, [
					// sub-level experience
					$('ul', {
						class: `${ prefix }-sublist`,
						role: 'navigation',
						ariaLabelledby: `${ prefix }-${ uuid }`
					}, item.menus.map(
						(childitem) => $('li', { class: `${ prefix }-subitem` }, [
							$('a', { class: `${ prefix }-sublink`, id: `-${ ++uuid }`, href: childitem.href }, [
								document.createTextNode(childitem.label)
							])
						])
					)),
					// sub-tile experience
					$('ul', {
						class: `${ prefix }-sublist--tiles`,
						role: 'navigation',
						ariaLabelledby: `${ prefix }-${ uuid }`
					}, item.menus.map(
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
				]) : []
			))
		))
	])
));

// unique id initialized
let uuid = 0;
