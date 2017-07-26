/* Global Footer: Tooling
/* ========================================================================== */

import { $, $append, $attrs, $bind, $unbind, $dispatch, $rmattrs } from 'esri-global-shared';
import esriLanguage from 'esri-global-language';

/* Global Footer
/* ========================================================================== */

export default (data) => {
	const links = [];

	const $footer = $('footer', { class: 'gfoot gfoot--fixed', ariaLabel: data.label });

	$append($footer, [
		$('div', { class: 'gfoot-section--1' }, [
			$('div', { class: 'gfoot-brand' }, [
				$('a', { class: 'gfoot-brand-link', href: data.brand.href, ariaLabel: data.brand.label }, [
					$('svg', { class: 'gfoot-brand-image', width: '114', height: '114', viewBox: data.brand.viewBox, role: 'presentation' }, [
						$('path', { d: data.brand.path })
					])
				])
			]),
			$('nav', { class: 'gfoot-social', ariaLabel: data.social.label }, [
				$('ul', { class: 'gfoot-social-list', role: 'presentation' }, data.social.menu.map(
					(item) => $('li', { class: 'gfoot-social-item' }, [
						$('a', { class: `gfoot-social-link -${ item.label.toLowerCase() }`, href: item.href, ariaLabel: item.label }, [
							$('svg', { class: 'gfoot-social-image', width: 30, height: 30, viewBox: item.image.viewBox, role: 'presentation' }, [
								$('path', { d: item.image.path })
							])
						])
					])
				))
			])
		]),
		$('div', { class: 'gfoot-section--2' }, [
			$('nav', { class: 'gfoot-menu', ariaLabel: data.main.label }, [
				$('ul', { class: 'gfoot-menu-list', role: 'presentation' }, data.main.menu.map(
					(item, index) => $('li', { class: 'gfoot-menu-item', id: `gfoot-menu-link--${ index }` }, [
						$('span', { class: 'gfoot-menu-link', role: 'heading' }, [
							document.createTextNode(item.label)
						], ($span) => {
							links.push($span);
						})
					].concat(
						item.menu ? $('nav', { class: 'gfoot-menu--sub', id: `gfoot-menu--sub--${ index }`, ariaLabelledby: `gfoot-menu-link--${ index }` }, [
							$('ul', { class: 'gfoot-menu-list--sub', role: 'presentation' }, item.menu.map(
								(subitem) => $('li', { class: 'gfoot-menu-item--sub' }, [
									$('a', { class: 'gfoot-menu-link--sub', href: subitem.href }, [
										document.createTextNode(subitem.label)
									])
								])
							))
						]) : []
					))
				))
			])
		]),
		$('div', { class: 'gfoot-section--3' }, [
			$('div', { class: 'gfoot-lang', id: 'gfoot-lang', ariaLabel: data.lang && data.lang.label || '', role: 'presentation' }, data.lang ? [
				$('button', { class: 'gfoot-lang-link', ariaDescribedby: 'gfoot-lang' }, [
					document.createTextNode(data.lang.button)
				], ($buttonTarget) => {
					$bind('click', $buttonTarget, () => {
						$dispatch('gfoot:click:lang', $buttonTarget, data.lang);
					});
				})
			] : [], ($lang) => {
				$bind('footer:update', $footer, () => {
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

					$bind('click', $close, (event) => {
						event.preventDefault();
					});

					$bind('click', $close, onclick);

					// ...
					$append($dialog, [ $close ]);

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

					$bind('click', $canvas, onclick);

					function onclick() {
						$attrs($content, {
							ariaExpanded: false
						});
					}

					// ...
					$bind('gfoot:click:lang', $lang, () => {
						$attrs($content, {
							ariaExpanded: true
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
							document.createTextNode(item.label)
						])
					])
				))
			])
		])
	]);

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

		$attrs(currentTarget, { ariaExpanded: !isVisible, ariaHaspopup: !isVisible, role: 'button', tabindex: 0 });

		$bind('click', currentTarget, onclick);
		$bind('keypress', currentTarget, onkeypress);

		$attrs(currentTarget.nextElementSibling, { ariaHidden: true });
	}

	function deactivate(currentTarget) {
		$rmattrs(currentTarget, 'ariaControls ariaExpanded ariaHaspopup role tabindex');

		$unbind('click', currentTarget, onclick);
		$unbind('keypress', currentTarget, onkeypress);

		$unbind('click', currentTarget, onclick);
		$unbind('keypress', currentTarget, onkeypress);

		$rmattrs(currentTarget.nextElementSibling, 'ariaHidden');
	}

	function onclick(event) {
		const currentTarget = event.currentTarget;
		const nextTarget = currentTarget.nextElementSibling;
		const isVisible = nextTarget.getAttribute('aria-hidden') !== 'true';

		$attrs(currentTarget, { ariaExpanded: !isVisible, ariaHaspopup: !isVisible });

		$attrs(nextTarget, { ariaHidden: isVisible });

		if (isVisible) {
			$attrs(currentTarget, { ariaControls: 0 });
		} else {
			$attrs(currentTarget, { ariaControls: nextTarget.id });
		}
	}

	function onkeypress(event) {
		if (event.keyCode === 13 || event.keyCode === 32) {
			event.preventDefault();

			$dispatch('click', event.currentTarget);
		}
	}

	$bind('focusin', $footer, () => {
		const scrollY = document.documentElement.scrollHeight - $footer.scrollHeight;

		if (scrollY > window.pageYOffset) {
			window.scrollTo(0, scrollY);
		}
	});

	/* On DOMNodeInserted
	/* ====================================================================== */

	$bind('DOMNodeInserted', $footer, function onload() {
		// Get Document and Window
		const $footerDocument = $footer.ownerDocument;
		const $footerWindow   = $footerDocument.defaultView;

		// Unbind Node Inserted
		$unbind('DOMNodeInserted', $footer, onload);

		// Update Header
		$dispatch('footer:update', $footer, data);
	});

	return $footer;
};
