// tooling
import $ from './lib/create-element';

// prefix
const prefix = 'esri-gnav-brand';

// render brand element
export default (brand) => $('a', { class: prefix, href: brand.href }, [
	$('img', { class: `${ prefix }-image`, ariaLabel: brand.label, src: brand.image })
]);
