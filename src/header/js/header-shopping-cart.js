import {$assign as $, $dispatch, $renderSvgOrImg} from '../../shared/js/shared';
import {$cart} from '../../shared/js/iconPaths';

const prefix = 'esri-header-shopping-cart';

export default () => {
	const $target = $('div', {class: prefix, 'data-cart-empty': 'true'});

	$target.addEventListener('click', (event) => {
		$dispatch($target, 'header:click:shoppingCart', {event});
	});

	const $control = $('a',
		{
			href: '#', 
			class: `${prefix}--icon`, 
			id: `${prefix}--icon`
		},
		$renderSvgOrImg({
			imgDef: $cart.md, 
			imgClass: `${prefix}--image`, 
			id: `${prefix}--image`
		})
	);

	const $cartItems = $('div',
		{class: `${prefix}--items`, id: `${prefix}--items`}
	);

	$($target,
		$control,
		$cartItems);

	$target.addEventListener('header:update:cart', ({detail}) => {
		if (detail) {
			$control.setAttribute('href', `${detail.url}`);
			changeCartCount(detail.items);
		}
	});

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
				$cartItems.setAttribute('data-cart-updated', 'true');
				setTimeout(() => {
					$cartItems.setAttribute('data-cart-updated', 'false');
				}, 1000);
			}
		} else {
			$cartItems.setAttribute('data-cart-updated', 'true');
			setTimeout(() => {
				$target.setAttribute('data-cart-empty', 'true');
			}, 1000);
		}
	};

	return $target;
};
