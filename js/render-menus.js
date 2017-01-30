// tooling
import $ from './lib/create-element';

// render menus element
export default (menus) => $('div', { class: '-menus' }, menus.map(
	(menu) => $('div', {
		class: '-menus-menu',
		role: 'group'
	}, [
		// top-level experience
		$('ul', {
			class: '-menus-list',
			role: 'navigation'
		}, menu.map(
			(item) => $('li', { class: '-menus-item' }, [
				$('a', Object.assign(
					{
						class: '-menus-link',
						id: `-${ ++uuid }`,
						href: item.href || 'javascript:;',
					},
					item.menus && item.menus.length ? {
						ariaControls: `-${ uuid }--sub`,
						ariaExpanded: false,
						ariaHaspopup: true
					} : {}
				), [
					document.createTextNode(item.label)
				])
			].concat(
				item.menus && item.menus.length ? $('div', {
					class: '-menus-submenu',
					id: `-${ uuid }--sub`,
					role: 'group',
					ariaHidden: true,
					ariaExpanded: false
				}, [
					// sub-level experience
					$('ul', {
						class: '-menus-sublist',
						role: 'navigation',
						ariaLabelledby: `-${ uuid }`
					}, item.menus.map(
						(childitem) => $('li', { class: '-menus-subitem' }, [
							$('a', { class: '-menus-sublink', id: `-${ ++uuid }`, href: childitem.href }, [
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
