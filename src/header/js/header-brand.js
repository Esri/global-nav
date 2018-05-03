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
		$($target, {href: detail.href});
		if (detail.distributorImage) {
			const $distributorImage = $('span', {class: 'distributor-image'});
			$renderSvgOrImg({imgDef: detail.distributorImage, imgClass: `${prefix}-image`, imgWidth: detail.distributorImageWidth, imgHeight:detail.distributorImageHeight, $targetElm:$distributorImage});			
			$($target, $distributorImage, $('span', {class: 'distributor-image-border'}));
		}
		if (detail.image) {
			const $brandImage = $('span', {class: 'brand-image'});
			$($target, {aria: {label: detail.label}});
			$renderSvgOrImg({imgDef: detail.image, imgClass: `${prefix}-image`, imgWidth: detail.width, imgHeight:detail.height, $targetElm:$brandImage});
			$($target, $brandImage);
		}
		if (detail.brandText) {
			const textClass = detail.image ? `${prefix}-text -has-image` : `${prefix}-text`;
			const $brandText = $('span', {class: textClass}, detail.brandText);
			$($target, $brandText);
		}
	});

	return $target;
};
