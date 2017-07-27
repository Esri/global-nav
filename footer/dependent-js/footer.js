/* Global Footer: Tooling
/* ========================================================================== */

import { $assign as $, $CustomEvent, $fetch, $replaceAll } from 'domose';

import esriLanguage from 'esri-global-language';

/* Global Footer
/* ========================================================================== */

export default (data) => {
	const links = [];

	const $footer = $('footer',
		{
			class: 'gfoot gfoot--fixed',
			aria: { label: data.label }
		}
	);

	$($footer,
		$('div', { class: 'gfoot-section--1' },
			$('div', { class: 'gfoot-brand' },
				$('a',
					{
						class: 'gfoot-brand-link',
						href: data.brand.href,
						aria: { label: data.brand.label }
					},
					$(
						'svg',
						{
							class: 'gfoot-brand-image',
							width: '114', height: '114', viewBox: data.brand.viewBox,
							role: 'presentation'
						},
						$(
							'path',
							{ d: data.brand.path }
						)
					)
				)
			),
			$('nav',
				{
					class: 'gfoot-social',
					aria: { label: data.social.label }
				},
				$('ul',
					{
						class: 'gfoot-social-list',
						role: 'presentation'
					},
					...data.social.menu.map(
						(item) => $('li', { class: 'gfoot-social-item' },
							$('a',
								{
									class: `gfoot-social-link -${ item.label.toLowerCase() }`,
									href: item.href,
									aria: { label: item.label }
								},
								$(
									'svg',
									{
										class: 'gfoot-social-image',
										width: 30, height: 30, viewBox: item.image.viewBox,
										role: 'presentation'
									},
									$(
										'path',
										{ d: item.image.path }
									)
								)
							)
						)
					)
				)
			)
		),
		$('div', { class: 'gfoot-section--2' },
			$('nav',
				{
					class: 'gfoot-menu',
					aria: { label: data.main.label }
				},
				$('ul',
					{
						class: 'gfoot-menu-list',
						role: 'presentation'
					},
					...data.main.menu.map(
						(item, index) => $('li', { class: 'gfoot-menu-item', id: `gfoot-menu-link--${ index }` },
							$('span',
								{
									class: 'gfoot-menu-link',
									role: 'heading'
								},
								item.label
							),
							...[].concat(
							item.menu ? $('nav',
								{
									class: 'gfoot-menu--sub', id: `gfoot-menu--sub--${ index }`,
									aria: { labelledby: `gfoot-menu-link--${ index }` }
								},
								$('ul',
									{
										class: 'gfoot-menu-list--sub',
										role: 'presentation'
									},
									...item.menu.map(
										(subitem) => $('li', { class: 'gfoot-menu-item--sub' },
											$('a', { class: 'gfoot-menu-link--sub', href: subitem.href },
												subitem.label
											)
										)
									)
								)
							) : []
						)
					)
				))
			)
		),
		$('div', { class: 'gfoot-section--3' }, [
			$('div', { class: 'gfoot-lang', id: 'gfoot-lang', ariaLabel: data.lang && data.lang.label || '', role: 'presentation' }, data.lang ? [
				$('button', { class: 'gfoot-lang-link', ariaDescribedby: 'gfoot-lang' }, [
					data.lang.button
				], ($buttonTarget) => {
					$buttonTarget.addEventListener('click', () => {
						$dispatch($buttonTarget, 'gfoot:click:lang', data.lang);
					});
				})
			] : [], ($lang) => {
				$footer.addEventListener('footer:update', () => {
					// ...
					const prefix = 'gfoot-lang-dialog';


					data.lang.prefix = prefix;

					// ...
					const $dialog = esriLanguage(data.lang);

					// ...
					const $close = $('button', {
						class: `${prefix}-close`, id: 'dialog-description',
						ariaLabel: data.close
					});

					$close.addEventListener('click', (event) => {
						event.preventDefault();
					});

					$close.addEventListener('click', onclick);

					// ...
					$($dialog, $close);

					// ...
					const $canvas = $('button', {
						class: `${prefix}-canvas`,
						type: 'button',
						tabindex: -1
					});

					// ...
					const $content = $('div', {
						class: `${prefix}-content`, id: `${prefix}-content`,
						ariaExpanded: false, ariaLabelledby: `${prefix}-control`
					}, [
						$canvas,
						$dialog
					]);

					$canvas.addEventListener('click', onclick);

					function onclick() {
						$($content, {
							aria: { expanded: false }
						});
					}

					// ...
					$lang.addEventListener('gfoot:click:lang', () => {
						$($content, {
							aria: { expanded: true }
						});
					});

					// ...
					$footer.parentNode.insertBefore($content, $footer.nextSibling);
				});

				return $lang;
			}),
			$('nav', { class: 'gfoot-meta', ariaLabel: data.meta.label }, [
				$('ul', { class: 'gfoot-meta-list', role: 'presentation' }, data.meta.menu.map(
					(item, index) => $('li', { class: 'gfoot-meta-item', id: `gfoot-meta-link--${ index }` }, [
						$('a', { class: 'gfoot-meta-link', href: item.href }, [
							item.label
						])
					])
				))
			])
		])
	);

	const media = matchMedia('(max-width: 719px)');

	let matches = false;

	media.addListener(onchange);

	onchange();

	function onchange() {
		if (media.matches !== matches) {
			matches = media.matches;

			links.forEach(
				(link) => {
					if (matches) {
						activate(link);
					} else {
						deactivate(link);
					}
				}
			);
		}
	}

	function activate(currentTarget) {
		const isVisible = currentTarget.nextElementSibling.getAttribute('aria-hidden') !== 'true';

		$(currentTarget, {
			tabindex: 0,
			role: 'button', aria: { expanded: !isVisible, haspopup: !isVisible }
		});

		currentTarget.addEventListener('click', onclick);
		currentTarget.addEventListener('keypress', onkeypress);

		$(currentTarget.nextElementSibling, { aria: { hidden: true } });
	}

	function deactivate(currentTarget) {
		currentTarget.removeAttribute('aria-controls');
		currentTarget.removeAttribute('aria-expanded');
		currentTarget.removeAttribute('aria-haspopup');
		currentTarget.removeAttribute('role');
		currentTarget.removeAttribute('tabindex');

		currentTarget.addEventListener('click', onclick);
		currentTarget.addEventListener('keypress', onkeypress);

		currentTarget.addEventListener('click', onclick);
		currentTarget.addEventListener('keypress', onkeypress);

		currentTarget.nextElementSibling.removeAttribute('aria-hidden');
	}

	function onclick(event) {
		const currentTarget = event.currentTarget;
		const nextTarget = currentTarget.nextElementSibling;
		const isVisible = 'true' !== nextTarget.getAttribute('aria-hidden');

		$(currentTarget, { aria: { expanded: !isVisible, haspopup: !isVisible } });

		$(nextTarget, { aria: { hidden: isVisible } });

		if (isVisible) {
			$(currentTarget, { aria: { controls: 0 } });
		} else {
			$(currentTarget, { aria: { controls: nextTarget.id } });
		}
	}

	function onkeypress(event) {
		if (event.keyCode === 13 || event.keyCode === 32) {
			event.preventDefault();

			$dispatch(event.currentTarget, 'click');
		}
	}

	$footer.addEventListener('focusin', () => {
		const scrollY = document.documentElement.scrollHeight - $footer.scrollHeight;

		if (scrollY > window.pageYOffset) {
			window.scrollTo(0, scrollY);
		}
	});

	/* On DOMNodeInserted
	/* ====================================================================== */

	$footer.addEventListener('DOMNodeInserted', function onload() {
		// Get Document and Window
		const $footerDocument = $footer.ownerDocument;
		const $footerWindow   = $footerDocument.defaultView;

		// Unbind Node Inserted
		$footer.removeEventListener('DOMNodeInserted', onload);

		// Update Header
		$dispatch($footer, 'footer:update', data);
	});

	return $footer;
};

/* Dispatch Helper
/* ========================================================================== */

function $dispatch(target, type, detail) {
	target.dispatchEvent($CustomEvent(type, { bubbles: true, detail }));
}
