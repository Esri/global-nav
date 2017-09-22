/* Tooling
/* ========================================================================== */

import { $assign as $, $dispatch, $replaceAll } from 'esri-global-shared';

/* Brand
/* ========================================================================== */

const prefix = 'esri-header-brand';
export default () => {
	/* Brand: Image
	/* ====================================================================== */

	/* Brand
	/* ====================================================================== */

	const $target = $('a', { class: prefix, id: prefix });

	// On Click
	$target.addEventListener('click', (event) => {
		$dispatch($target, 'header:click:brand', { event });
	});

	/* Brand: On Update
	/* ====================================================================== */
	$target.addEventListener('header:update:brand', ({ detail }) => {

		$($target, { href: detail.href, aria: { label: detail.label } });

		if(typeof detail.image === 'string'){
			const $img = $('img', {src:detail.image, class: `${prefix}-image`, style: `width : ${detail.width}px, height:${detail.height}px`});
			$target.appendChild($img);
		}else{
			const $targetImage = $(
				document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
				{class: `${prefix}-image`, viewBox: `0 0 ${detail.width} ${detail.height}`, width: `${detail.width}`, height: `${detail.height}` }
			);
			$replaceAll($targetImage,
				...detail.image.map(
					(d) => $(
						document.createElementNS('http://www.w3.org/2000/svg', 'path'),
						{ d }
					)
				)
			);
			$target.appendChild($targetImage);
		}




	});

	return $target;
}
