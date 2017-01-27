import $ from './create-element';

import $brand from './lib/brand';

import $menus from './lib/menus';

import $user from './lib/user';

import $search from './lib/search';

export default function (data) {
	const $target = document.body.appendChild(
		$( 'div', { class: 'esri-gnav' }, [].concat(
			data.brand ? $brand(data.brand) : [],
			data.menus && data.menus.length ? $menus(data.menus) : [],
			data.search ? $search(data.search) : [],
			data.apps || data.user ? $user(data.apps, data.user) : []
		))
	);

	// temporary code from here...

	function closeAll() {
		Array.from($target.querySelectorAll('[aria-expanded]')).forEach(
			($expanded) => $expanded.removeAttribute('aria-expanded')
		);
	}

	$target.addEventListener(
		'keydown',
		(event) => {
			if (event.keyCode === 27) {
				closeAll();
			}
		}
	);

	$target.addEventListener(
		'click',
		(event) => {
			const $clickable = event.target.closest('a,button');

			if ($clickable) {
				event.target.dispatchEvent(
					new CustomEvent(
						'esri-gnav:click',
						{
							bubbles: true,
							detail: {
								target: $clickable
							}
						}
					)
				);

				const controls = $clickable.getAttribute('aria-controls');

				if (controls) {
					const toExpand = $clickable.getAttribute('aria-expanded') !== 'true';
					const $controlled = document.getElementById(controls);

					closeAll();

					$clickable.setAttribute('aria-expanded', toExpand);

					if ($controlled) {
						$controlled.setAttribute('aria-expanded', toExpand);
					}
				}
			}
		}
	);

	$target.addEventListener(
		'esri-gnav:click',
		(event) => console.log(
			['event', event.type],
			['target', event.detail.target]
		)
	);
}
