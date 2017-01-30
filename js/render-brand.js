// tooling
import $ from './lib/create-element';

// render brand element
export default (brand) => $('a', { class: '-brand', href: brand.href }, [
	$('svg', { class: '-brand-image', ariaLabel: brand.label }, [
		$('use', { href: brand.image })
	])
]);
