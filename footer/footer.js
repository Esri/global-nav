/* Global Footer: Tooling
/* ========================================================================== */

import { $fetch } from 'esri-global-shared';
import footer from './dependent-js/footer';

/* Global Footer
/* ========================================================================== */

function create(data) {
	return footer(data);
}

function createFromURL(url) {
	$fetch(url, (responseText) => {
		create(
			JSON.parse(responseText)
		);
	});
}

export default {
	create,
	createFromURL
}
