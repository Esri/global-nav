import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';

const prefix = 'esri-header-brand';

export default () => {
	const $target = $('a', {class: prefix, id: prefix});

	// On Click
	$target.addEventListener('click', (event) => {
		$dispatch($target, 'header:click:brand', {event});
	});

	/* Brand: On Update
	/* ====================================================================== */
	$target.addEventListener('header:update:brand', ({detail}) => {
		const $targetImage = $renderSvgOrImg({imgDef: detail.image, imgClass: `${prefix}-image`, imgWidth: detail.width, imgHeight:detail.height});

		$($target, {href: detail.href, aria: {label: detail.label}});
		$target.appendChild($targetImage);

		// $($targetImage, {viewBox: `0 0 ${detail.width} ${detail.height}`, width: `${detail.width}`, height: `${detail.height}`});
		//
		// $replaceAll($targetImage,
		// 	...detail.image.map(
		// 		(d) => $(
		// 			document.createElementNS('http://www.w3.org/2000/svg', 'path'),
		// 			{d}
		// 		)
		// 	)
		// );
	});

	return $target;
};
