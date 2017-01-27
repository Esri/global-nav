import $ from '../create-element';

const uuid = Date.now();

export default function (menus) {
	return $('div', { class: 'esri-gnav-menus' }, menus.map(
		(menu) => $('div', { class: 'esri-gnav-menus-menu esri-gnav-menus-menu--top' }, [
			$('ul', { class: 'esri-gnav-menus-list esri-gnav-menus-list--top' }, menu.map(
				(item) => $('li', { class: 'esri-gnav-menus-item esri-gnav-menus-item--top' }, [
					$('a', Object.assign(
						{
							class: 'esri-gnav-menus-link esri-gnav-menus-link--top',
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
						class: 'esri-gnav-menus-menu esri-gnav-menus-menu--sub',
						id: `esri-gnav-${ uuid }--sub`,
						role: 'group',
						ariaHidden: true,
						ariaExpanded: false,
						ariaLabelledby: `esri-gnav-${ uuid }`
					}, [
						$('ul', { class: 'esri-gnav-menus-list esri-gnav-menus-list--sub' }, item.menus.map(
							(childitem) => $('li', { class: 'esri-gnav-menus-item esri-gnav-menus-item--sub' }, [
								$('a', { class: 'esri-gnav-menus-link esri-gnav-menus-link--sub', id: `esri-gnav-${ ++uuid }`, href: childitem.href }, [
									document.createTextNode(childitem.label)
								])
							])
						))
					]) : []
				))
			))
		])
	));
}
