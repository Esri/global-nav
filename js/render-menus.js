// tooling
import $ from './lib/create-element';

// render menus element
export default (menus) => $('div', { class: 'esri-gnav-menus' }, menus.map(
	(menu) => $('div', {
		class: 'esri-gnav-menu esri-gnav-menu--top esri-gnav-menus-menu esri-gnav-menus-menu--top',
		role: 'group'
	}, [
		// top level experience
		$('ul', {
			class: 'esri-gnav-list esri-gnav-menus-list esri-gnav-menus-list--top',
			role: 'navigation'
		}, menu.map(
			(item) => $('li', { class: 'esri-gnav-item esri-gnav-menus-item esri-gnav-menus-item--top' }, [
				$('a', Object.assign(
					{
						class: 'esri-gnav-link esri-gnav-menus-link esri-gnav-menus-link--top',
						id: `esri-gnav-${ ++uuid }`,
						href: item.href || 'javascript:;',
					},
					item.menus && item.menus.length ? {
						ariaControls: `esri-gnav-${ uuid }--sub`,
						ariaExpanded: false,
						ariaHaspopup: true
					} : {}
				), [
					document.createTextNode(item.label)
				])
			].concat(
				item.menus && item.menus.length ? $('div', {
					class: 'esri-gnav-menu esri-gnav-menu--sub esri-gnav-menus-menu esri-gnav-menus-menu--sub',
					id: `esri-gnav-${ uuid }--sub`,
					role: 'group',
					ariaHidden: true,
					ariaExpanded: false
				}, [
					// sub level experience
					$('ul', {
						class: 'esri-gnav-list esri-gnav-menus-list esri-gnav-menus-list--sub',
						role: 'navigation',
						ariaLabelledby: `esri-gnav-${ uuid }`
					}, item.menus.map(
						(childitem) => $('li', { class: 'esri-gnav-item esri-gnav-menus-item esri-gnav-menus-item--sub' }, [
							$('a', { class: 'esri-gnav-link esri-gnav-menus-link esri-gnav-menus-link--sub', id: `esri-gnav-${ ++uuid }`, href: childitem.href }, [
								document.createTextNode(childitem.label)
							])
						])
					))
				]) : []
			))
		))
	])
));

// unique id initialized
const uuid = Date.now();
