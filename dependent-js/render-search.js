// tooling
import $ from './lib/create-element';

// prefix
const prefix = 'esri-gnav-search';

// render search element
export default (search) => $('button', { class: `${ prefix }-link`, ariaLabel: search.label }, [
	$('img', { class: `${ prefix }-image`, src: 'images/search.svg' })
]);

