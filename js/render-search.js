// tooling
import $ from './lib/create-element';

// render search element
export default (search) => $('button', { class: '-search-link', ariaLabel: search.label }, [
	$('svg', { class: '-search-icon' }, [
		$('use', { href: 'assets/gnav.svg#search' })
	])
]);

