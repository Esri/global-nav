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

	const $cartItems = $('div',
		{class: `${prefix}--items`, id: `${prefix}--items`}
	);

	$target.addEventListener('header:update:cart', ({detail}) => {
		const $control = $('div',
			{
				class: `${prefix}--icon`, id: `${prefix}--icon`,
				aria: {expanded: false, controls: `${prefix}--content`}
			}, $renderSvgOrImg({imgDef: $cart.md, imgClass: `${prefix}--image`, id: `${prefix}--image`, $targetElm: $control})
		);

		$($target,
			$control,
			$cartItems
		);
		changeCartCount(detail.items);
	});

	/* Shopping Cart: Target
	/* ====================================================================== */

  $target.addEventListener('header:shoppingcart:add', ({detail}) => {
		changeCartCount(detail, true);
	});

	$target.addEventListener('header:shoppingcart:remove', ({detail}) => {
		changeCartCount(-detail, true);
	});

	const changeCartCount = (inc, animate) => {
		let currCount = parseInt($cartItems.innerHTML);
		currCount = (isNaN(currCount) || currCount < 0) ? 0 : currCount;

		const cartCount = currCount + parseInt(inc);
		$cartItems.innerHTML = cartCount;

		if (cartCount > 0) {
			$target.setAttribute('data-cart-empty', 'false');
			if (animate) {
				$cartItems.setAttribute('data-cart-updated', true);
				setTimeout(() => {
					$cartItems.setAttribute('data-cart-updated', false);
				}, 1000);
			}
		} else {
			$target.setAttribute('data-cart-empty', 'true');
		}
	};

	return $target;
};
