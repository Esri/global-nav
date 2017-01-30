// tooling
import $ from './lib/create-element';

// render apps element
export default (apps, user) => $('div', { class: 'esri-gnav-apps' }, [
	$('button', {
		class: 'esri-gnav-link esri-gnav-button esri-gnav-apps-link',
		id: 'esri-gnav-apps-control',
		ariaControls: 'esri-gnav-apps-menu',
		ariaExpanded: false,
		ariaHaspopup: true,
		ariaLabel: apps.label
	}, [
		$('svg', { class: 'esri-gnav-icon esri-gnav-apps-icon' }, [
			$('use', { href: 'assets/gnav.svg#apps' })
		])
	]),
	$('div', {
		class: 'esri-gnav-apps-menu',
		id: 'esri-gnav-apps-menu',
		role: 'group',
		ariaExpanded: false,
		ariaHidden: true,
		ariaLabelledby: 'esri-gnav-apps-control'
	}, [
		$('ul', { class: 'esri-gnav-apps-menu-list' }, [
			$('li', { class: 'esri-gnav-apps-menu-item' }, [
				document.createTextNode('App #1')
			]),
			$('li', { class: 'esri-gnav-apps-menu-item' }, [
				document.createTextNode('App #2')
			]),
			$('li', { class: 'esri-gnav-apps-menu-item' }, [
				document.createTextNode('App #3')
			])
		])
	])
]);
