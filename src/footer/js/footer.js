import {$assign as $, $dispatch, $enableFocusRing, onElementInserted} from '../../shared/js/shared';

import brand from './footer-brand';
import language from './footer-language';
import menu from './footer-menu';
import info from './footer-info';
import social from './footer-social';
import breadcrumbs from './footer-breadcrumbs';

/* Global Footer
/* ========================================================================== */

export default (data) => {
	const prefix = data.prefix || 'esri-footer';

	/* Footer Components
	/* ====================================================================== */

	const $footerBrand = brand(data.brand, prefix);
	const $footerInfo = info(data.info, prefix);
	const $footerLanguage = data.language ? language(data.language, prefix) : $('div', {class: `esri-footer-language`});
	const $footerMenu = menu(data.menu, prefix);
	const $footerSocial = social(data.social, prefix);
	const $footerBreadcrumb = breadcrumbs(data);

	const $footer = $('footer',
		{
			class: `${prefix} ${data.hideMenus ? 'skinny-footer' : ''}`
		},

		/* Append Footer Components
		/* ================================================================== */
		$('div', {class: `${prefix}-section--0`},
			$footerBreadcrumb,
		),
		$('div', {class: `${prefix}--wrapper`},
			$('div', {class: `${prefix}-section--1 ${data.hideMenus ? 'hidden' : ''}`},
				$footerBrand,
				$footerSocial
			),
			$('div', {class: `${prefix}-section--2 ${data.hideMenus ? 'hidden' : ''}`},
				$footerMenu
			),
			$('div', {class: `${prefix}-section--3`},
				$footerLanguage,
				$footerInfo
			)
		)
	);

	/* on Element Ready
	/* ====================================================================== */

	onElementInserted($footer, () => {
		// Scroll to Footer on focus
		$footer.addEventListener('focusin', () => {
			const scrollY = $footer.ownerDocument.documentElement.scrollHeight - $footer.scrollHeight;

			if (scrollY > $footer.ownerDocument.defaultView.pageYOffset) {
				$footer.ownerDocument.defaultView.scrollTo(0, scrollY);
			}
		});

		if (data.hideMenus) {
			document.querySelector('.esri-footer').setAttribute('data-minimal', true);
			document.querySelector('.esri-footer-barrier').classList.add('skinny-footer');
		}

		// Update Header
		$dispatch($footer, 'footer:update', data);
	});

	$enableFocusRing($footer);

	/* On Footer Update
	/* ====================================================================== */

	$footer.addEventListener('footer:update', ({detail}) => {
		if (detail.brand) {
			$dispatch($footerBrand, 'footer:update:brand', detail.brand);
		}

		if (detail.info) {
			$dispatch($footerInfo, 'footer:update:info', detail.info);
		}

		if (detail.language) {
			$dispatch($footerLanguage, 'footer:update:language', detail.language);
		}

		if (detail.menu) {
			$dispatch($footerMenu, 'footer:update:menu', detail.menu);
		}

		if (detail.social) {
			$dispatch($footerSocial, 'footer:update:social', detail.social);
		}

		$footer.ownerDocument.defaultView.addEventListener('scroll', onscroll);

		onscroll();

		function onscroll() {
			const hidden = 0 > window.pageYOffset;

			$($footer, {data: {hidden}});
		}
	});

	return $footer;
};
