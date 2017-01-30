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
		ariaLabelledby: `${ prefix }-link`
	}, [
		$('ul', { class: `${ prefix }-list` }, [
			$('li', { class: `${ prefix }-item` }, [
				document.createTextNode('App #1')
			]),
			$('li', { class: `${ prefix }-item` }, [
				document.createTextNode('App #2')
			]),
			$('li', { class: `${ prefix }-item` }, [
				document.createTextNode('App #3')
			])
		])
	])
]);
