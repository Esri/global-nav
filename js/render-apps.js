// tooling
import $ from './lib/create-element';

// prefix
const prefix = 'esri-gnav-apps';

// render apps element
export default (apps, user) => $('div', { class: prefix }, [
	$('button', {
		class: `${ prefix }-link`,
		id: `${ prefix }-link`,
		ariaControls: `${ prefix }-menu`,
		ariaExpanded: false,
		ariaHaspopup: true,
		ariaLabel: apps.label
	}, [
		$('svg', { class: `${ prefix }-icon` }, [
			$('use', { href: 'assets/gnav.svg#apps' })
		])
	]),
	$('div', {
		class: `${ prefix }-menu`,
		id: `${ prefix }-menu`,
		role: 'group',
		ariaExpanded: false,
		ariaHidden: true,
		ariaLabelledby: `${ prefix }-menu-link`
	}, [
		$('ul', { class: `${ prefix }-menu-list` }, [
			$('li', { class: `${ prefix }-menu-item` }, [
				$('button', { class: `${ prefix }-menu-link` }, [
					$('img', { class: `${ prefix }-menu-image`, src: '//placehold.it/256x256' }),
					document.createTextNode('App #1')
				])
			]),
			$('li', { class: `${ prefix }-menu-item` }, [
				$('button', { class: `${ prefix }-menu-link` }, [
					$('img', { class: `${ prefix }-menu-image`, src: '//placehold.it/256x256' }),
					document.createTextNode('App #2 with a long name')
				])
			]),
			$('li', { class: `${ prefix }-menu-item` }, [
				$('button', { class: `${ prefix }-menu-link` }, [
					$('img', { class: `${ prefix }-menu-image`, src: '//placehold.it/256x256' }),
					document.createTextNode('App #3 shorter')
				])
			]),
			$('li', { class: `${ prefix }-menu-item` }, [
				$('button', { class: `${ prefix }-menu-link` }, [
					$('img', { class: `${ prefix }-menu-image`, src: '//placehold.it/256x256' }),
					document.createTextNode('App #4')
				])
			]),
			$('li', { class: `${ prefix }-menu-item` }, [
				$('button', { class: `${ prefix }-menu-link` }, [
					$('img', { class: `${ prefix }-menu-image`, src: '//placehold.it/256x256' }),
					document.createTextNode('App #5')
				])
			])
		])
	])
]);
