// tooling
import $       from './lib/create-element';
import $brand  from './render-brand';
import $menus  from './render-menus';
import $search from './render-search';
import $client from './render-client';

// render the gnav
export default function (data) {
	const $target = document.body.appendChild(
		$( 'div', { class: `esri-gnav -${ data.theme || 'web' }` }, [].concat(
			data.brand ? $brand(data.brand) : [],
			data.menus && data.menus.length ? $menus(data.menus) : [],
			data.search ? $search(data.search) : [],
			data.apps || data.user ? $client(data.apps, data.user) : []
		))
	);

	// stop-gap functionality from here on out...

	function closeAll() {
		Array.prototype.slice.call($target.querySelectorAll('[aria-expanded]')).forEach(
			($expanded) => $expanded.removeAttribute('aria-expanded')
		);
	}

	window.addEventListener(
		'click',
		(event) => {
			if ($target.contains(event.target)) {
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
							$controlled.setAttribute('aria-hidden', !toExpand);
						}
					}
				}
			} else {
				closeAll();
			}
		}
	)

	$target.addEventListener(
		'keydown',
		(event) => {
			if (event.keyCode === 27) {
				closeAll();
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
