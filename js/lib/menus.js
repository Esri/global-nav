import $ from '../create-element';

export default function (menus) {
	return $('div', { class: 'esri-gnav-menus' }, menus.map(
		(menu) => $('div', { class: 'esri-gnav-menus-menu esri-gnav-menus-menu--top' }, [
			$('ul', { class: 'esri-gnav-menus-list esri-gnav-menus-list--top' }, menu.map(
				(item) => $('li', { class: 'esri-gnav-menus-item esri-gnav-menus-item--top' }, [
					$('a', { class: 'esri-gnav-menus-link esri-gnav-menus-link--top', href: item.href }, [
						document.createTextNode(item.label)
					])
				].concat(
					item.menus && item.menus.length ? $('div', { class: 'esri-gnav-menus-menu esri-gnav-menus-menu--sub', ariaExpanded: true }, [
						$('ul', { class: 'esri-gnav-menus-list esri-gnav-menus-list--sub' }, item.menus.map(
							(childitem) => $('li', { class: 'esri-gnav-menus-item esri-gnav-menus-item--sub' }, [
								$('a', { class: 'esri-gnav-menus-link esri-gnav-menus-link--sub', href: childitem.href }, [
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
