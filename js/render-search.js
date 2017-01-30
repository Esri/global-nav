// tooling
import $ from './lib/create-element';

// render search element
export default (search) => $('button', { class: 'esri-gnav-link esri-gnav-button esri-gnav-search', ariaLabel: search.label }, [
	$('svg', { class: 'esri-gnav-icon' }, [
		$('use', { href: 'assets/gnav.svg#search' })
	])
]);

