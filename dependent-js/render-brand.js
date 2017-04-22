// tooling
import $ from './lib/create-element';

// prefix
const prefix = 'esri-gnav-brand';

// render brand element
export default (brand) => $('a', { class: prefix, href: brand.href }, [
	$('svg', {
		class: `${ prefix }-image`,
		ariaLabel: brand.label
	}, [
		$('use', { 'href': brand.image })
	])
]);
