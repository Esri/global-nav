import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';

const prefix = 'esri-header-brand';

export default () => {
	const $target = $('div', {class: `${prefix}-container`});
	
	// On Click
	$target.addEventListener('click', (event) => {
		$dispatch($target, 'header:click:brand', {event});
	});
	
	/* Brand: On Update
	/* ====================================================================== */
	$target.addEventListener('header:update:brand', ({detail}) => {
		if (detail.image) {
			const $link = $('a', {class: prefix, id: prefix, href: detail.href, aria: {label: detail.label}});
			$renderSvgOrImg({imgDef: detail.image, imgClass: `${prefix}-image`, imgWidth: detail.width, imgHeight:detail.height, $targetElm:$link});
			$($target, $link);
		}
		if (detail.brandText) {
			const $brandText = $('span', {class: `${prefix}-text`}, detail.brandText);
			$($target, $brandText);
		}
	});

	return $target;
};
