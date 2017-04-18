// tooling
import $       from './lib/create-element';
import $brand  from './render-brand';
import $menus  from './render-menus';
import $search from './render-search';
import $client from './render-client';

// render the gnav
export default function (data) {
	const $target = document.body.insertBefore(
		$( 'div', { class: `esri-gnav -${ data.theme || 'web' }` }, [].concat(
			data.brand ? $brand(data.brand) : [],
			data.menus && data.menus.length ? $menus(data.menus) : [],
			data.search ? $search(data.search) : [],
			data.apps || data.user ? $client(data.apps, data.user) : []
		)),
		document.body.firstChild
	);

	const user = document.getElementById('esri-gnav-user');
	const userControl = user.querySelector('a,button');
	const content = document.getElementById('esri-gnav-menus-content');

	const media = window.matchMedia('(max-width: 767px)');

	media.addListener(onmediachange);

	onmediachange();

	window.data = data;

	function onmediachange() {
		if (media.matches) {
			content.appendChild(user);

			userControl.setAttribute('data-related', 'esri-gnav-menus-content');
		} else {
			$target.appendChild(user);

			userControl.removeAttribute('data-related');
		}
	}

	// stop-gap functionality from here on out...

	function closeAll(scope) {
		const $scope = scope || $target;

		Array.prototype.slice.call($scope.querySelectorAll('[aria-controls]')).forEach(
			($controls) => {
				const $expanded = document.getElementById($controls.getAttribute('aria-controls'));

				$controls.setAttribute('aria-expanded', false);

				$expanded.setAttribute('aria-expanded', false);
				$expanded.setAttribute('aria-hidden', true);
			}
		);

		if (!scope) {
			$target.setAttribute('is-open', false);
		}
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
					const related = $clickable.getAttribute('data-related');

					if (controls || related) {
						const toExpand = $clickable.getAttribute('aria-expanded') !== 'true';
						const $related = related && document.getElementById(related);

						closeAll($related);

						if (controls) {
							const $controlled = document.getElementById(controls);

							$clickable.setAttribute('aria-expanded', toExpand);

							if ($controlled) {
								$controlled.setAttribute('aria-expanded', toExpand);
								$controlled.setAttribute('aria-hidden', !toExpand);
							}

							$target.setAttribute('is-open', toExpand);
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
