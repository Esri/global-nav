import $ from './lib/create-element';

export default (apps, user) => $('div', { class: 'esri-gnav-apps' }, [
	$('button', { class: 'esri-gnav-link', ariaLabel: apps.label }, [
		$('svg', { class: 'esri-gnav-icon' }, [
			$('use', { href: 'assets/gnav.svg#apps' })
		])
	])
]);
