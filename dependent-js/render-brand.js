// tooling
import $ from './lib/create-element';

// prefix
const prefix = 'esri-gnav-brand';

// render brand element
export default (brand) => $('a', { class: prefix, href: brand.href }, [
	$('svg', {
		class: `${ prefix }-image`,
		ariaLabel: brand.label,
		width: brand.width, height: brand.height
	}, [
		$('use', { 'href': brand.image })
	])
]);
