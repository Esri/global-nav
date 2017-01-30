// tooling
import $ from './lib/create-element';

// render apps element
export default (apps, user) => $('div', { class: '-apps' }, [
	$('button', {
		class: '-apps-link',
		id: '-apps-link',
		ariaControls: '-apps-menu',
		ariaExpanded: false,
		ariaHaspopup: true,
		ariaLabel: apps.label
	}, [
		$('svg', { class: '-apps-icon' }, [
			$('use', { href: 'assets/gnav.svg#apps' })
		])
	]),
	$('div', {
		class: '-apps-menu',
		id: '-apps-menu',
		role: 'group',
		ariaExpanded: false,
		ariaHidden: true,
		ariaLabelledby: '-apps-link'
	}, [
		$('ul', { class: '-apps-menu-list' }, [
			$('li', { class: '-apps-menu-item' }, [
				document.createTextNode('App #1')
			]),
			$('li', { class: '-apps-menu-item' }, [
				document.createTextNode('App #2')
			]),
			$('li', { class: '-apps-menu-item' }, [
				document.createTextNode('App #3')
			])
		])
	])
]);
