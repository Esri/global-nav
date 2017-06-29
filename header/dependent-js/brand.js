/* Tooling
/* ========================================================================== */

import { $, $empty, $attrs, $rmattrs, $bind, $dispatch } from 'esri-global-shared';

/* Brand
/* ========================================================================== */

const prefix = 'esri-header-brand';

export default () => {
	/* Brand: Image
	/* ====================================================================== */

	const $targetImage = $('svg', { class: `${prefix}-image` });

	/* Brand
	/* ====================================================================== */

	const $target = $('a', { class: prefix, id: prefix }, [ $targetImage ]);

	// On Click
	$bind('click', $target, (event) => {
		$dispatch('header:click:brand', $target, { event });
	});

	/* Brand: On Update
	/* ====================================================================== */

	$bind('header:update:brand', $target, ({ detail }) => {
		$attrs($target, { href: detail.href, ariaLabel: detail.label });

		if ('string' === typeof detail.image) {
			$rmattrs($targetImage, 'viewBox');

			$empty($targetImage, [
				$('use', { 'href': detail.image })
			]);
		} else {
			$attrs($targetImage, { viewBox: `0 0 ${detail.width} ${detail.height}` });

			$empty($targetImage, detail.image.map(
				(d) => $('path', { d })
			));
		}
	});

	return $target;
}
