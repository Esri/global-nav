import {$assign as $, $dispatch, $replaceAll, $renderSvgOrImg} from '../../shared/js/shared';
import {$cart} from '../../shared/js/iconPaths';

const prefix = 'esri-header-shopping-cart';

export default () => {
	const $target = $('div', {class: prefix});

	$target.addEventListener('click', (event) => {
    $dispatch($target, 'header:click:shoppingCart', {event});
	});

	/* Shopping Cart: Control
	/* ====================================================================== */

	$target.addEventListener('header:update:cart', ({detail}) => {
		const $control = $('div',
			{
				class: `${prefix}--icon`, id: `${prefix}--icon`,
				aria: {expanded: false, controls: `${prefix}--content`}
			}, $renderSvgOrImg({imgDef: $cart.md, imgClass: `${prefix}--image`, id: `${prefix}--image`, $targetElm: $control})
		);
		
		const $cartItems = $('div',
			{
				class: `${prefix}--items`, id: `${prefix}--items`, 'data-cart-updated': 'true'
			}, `${detail.items}`
		);

		$($target, 
			$control,
			$cartItems
		);
	});

	/* Shopping Cart: Target
	/* ====================================================================== */

  $target.addEventListener('header:shoppingcart:add', ({detail}) => {
		console.log('add', detail);
	});

	$target.addEventListener('header:shoppingcart:remove', ({detail}) => {
		console.log('remove', detail);
	});

	return $target;
};
