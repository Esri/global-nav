import {$assign as $, $dispatch, $enableFocusRing, $replaceAll} from '../../shared/js/shared';

import createAccount from './header-account';
import createBrand from './header-brand';
import createInlineTitle from './header-inline-title';
import createBrandStripe from './header-branding-stripe';
import createMenus from './header-menus';
import createSearch from './header-search';
import createInlineSearch from './header-inline-search';
import createShoppingCart from './header-shopping-cart';
import createApps from './header-apps';
import createAppSwitcher from './header-app-switcher';
import createNotifications from './header-notifications';

/* Header
/* ====================================================================== */

export default (data) => {
	let viewportIsSmall;
	let viewportIsSmallMedium;

	/* Canvas
	/* ====================================================================== */

	const $headerCanvas = $('div', {
		class: 'esri-header-canvas',
		tabindex: '-1',
		data: {open: false}
	});

	$headerCanvas.addEventListener('click', () => {
		$dispatch($headerCanvas, 'header:menu:close');
	});

	/* Elements
	/* ====================================================================== */

	const $brandStripe = createBrandStripe();
	const $brand = createBrand();
	const $inlineTitle = createInlineTitle();
	const $account = createAccount();
	const $mobileMenus = createMenus({variant: 'mobile'});
	const $desktopMenus = createMenus({variant: 'desktop'});
	const $search = createSearch();
	const $shoppingCart = createShoppingCart();
	const $inlineSearch = createInlineSearch();
	const $notifications = createNotifications();
	const $apps = createApps();
	const $appSwitcher = createAppSwitcher();

	const $client = $('div', {class: 'esri-header-client'},
		$account
	);

	const $lineBreak = $('div', {class: 'esri-header-lineBreak'});
	const $headerContent = $('div', {class: `esri-header -${data.theme || 'web'} ${data.collapseMenus ? '-always-hamburger' : ''}`},
		$brandStripe,
		$brand,
		$mobileMenus,
		$inlineTitle,
		$desktopMenus,
		$search,
		$inlineSearch,
		$lineBreak,
		$shoppingCart,
		$notifications,
		$apps,
		$appSwitcher,
		$client)
		;
	const $header = $('div', {class: `esri-header-canvas`}, $headerCanvas, {class: `esri-header-wrap`}, $headerContent);

	$enableFocusRing($header);

	/* On Header Update
	/* ====================================================================== */

	$header.addEventListener('header:update', ({detail}) => {
		if (detail.brand) {
			detail.brand.root = true;
		}

		$dispatch($brandStripe, 'header:update:brand', detail.brand);
		$dispatch($brand, 'header:update:brand', detail.brand);
		$dispatch($inlineTitle, 'header:update:inlineTitle', detail.brand);
		$dispatch($search, 'header:update:search', detail.search);
		$dispatch($inlineSearch, 'header:update:inlineSearch', detail.search);
		$dispatch($client.lastChild, 'header:update:account', detail.account);
		$dispatch($apps, 'header:update:apps', detail.apps);
		$dispatch($appSwitcher, 'header:update:appSwitcher', detail.appSwitcher);
		$dispatch($notifications, 'header:update:notifications', detail.notifications);
		$dispatch($shoppingCart, 'header:update:cart', detail.cart);

		if (detail.menus) {
			detail.menus.noBrand = !detail.brand;
			$dispatch($desktopMenus, 'header:update:menus', detail.menus);
			$dispatch($mobileMenus, 'header:update:menus', detail.menus);
		}

		if (detail.collapseMenus) {
			$dispatch($desktopMenus, 'header:update:collapseMenus', detail.collapseMenus);
			$dispatch($mobileMenus, 'header:update:collapseMenus', detail.collapseMenus);
		}

		if (detail.brand && detail.brand.topStripe) {
			$header.style.marginTop = '3px';
		}

		if (!detail.notifications && !detail.apps && !detail.account) {
			$lineBreak.classList.add('esri-header-lineBreak-hidden');
		}

		$header.ownerDocument.defaultView.addEventListener('keydown', ({keyCode}) => {
			if (27 === keyCode) {
				// prior to closing with escape, save a reference to the menu to we can refocus it
				const currentFocus = document.activeElement;
				const menu = currentFocus.closest(".a11y-esri-header-notifications,.a11y-esri-header-apps,.a11y-esri-header-account");
				$dispatch($header, 'header:menu:close');
				if (menu) {
					const toggle = menu.querySelector("button");
					if (toggle) {
						toggle.focus();
					}
				}
			}
		});
	});

	/* On Inline Search
	/* ====================================================================== */

	$header.addEventListener('header:search:typing', ({detail}) => {
		$dispatch($inlineSearch, 'header::search:typing', detail.search);
	});

	$header.addEventListener('header:search:update:suggestions', ({detail}) => {
		$dispatch($inlineSearch, 'header:search:populateSuggestions', detail);
	});

	/* On Save Title
	/* ====================================================================== */

	$header.addEventListener('header:title:submit', ({detail}) => {
		$dispatch($inlineSearch, 'header::title:save', detail.title);
	});

	/* On Drag & Drop Apps
	/* ====================================================================== */

	$header.addEventListener('header:apps:reorder', ({detail}) => {
		$dispatch($apps, 'header::apps:reorder', detail.icons);
	});

	/* On Header Menu Toggle
	/* ====================================================================== */

	$header.addEventListener('header:menu:toggle', ({detail}) => {
		const submenuShouldOpen = 'true' !== detail.control.getAttribute('aria-expanded');
		const eventType = submenuShouldOpen ? 'header:menu:open' : 'header:menu:close';

		$dispatch(detail.control, eventType, detail);
	});

	/* On Header Menu Open
	/* ====================================================================== */

	let accountDetail = null;
	let searchDetail = null;
	let menusDetail = null;
	let menuDetail = null;
	let appsDetail = null;
	let appSwitcherDetail = null;
	let inlineTitleDetail = null;
	let notificationsDetail = null;

	$header.addEventListener('header:menu:open', ({detail}) => {
		const menuWrapper = detail.control.closest && detail.control.closest('.esri-header-menus');
		const hasMobileClass = menuWrapper && menuWrapper.classList.contains('-mobile');
		const isMenuMobile = ('menu-toggle' === detail.type && viewportIsSmallMedium.matches) || hasMobileClass;
		const isAccountMobile = ($account === detail.target && viewportIsSmall.matches);


		// Update Control, Content
		$(detail.control, {aria: {expanded: true}});
		$(detail.content, {aria: {expanded: true, hidden: false}});

		if (menuDetail && menuDetail.control !== detail.control) {
			$dispatch(menuDetail.control, 'header:menu:close', menuDetail);
		}

		if ('menu-toggle' === detail.type) {
			menuDetail = detail;
		}

		if ($search === detail.target || $inlineSearch === detail.target) {
			searchDetail = detail;
		} else if (searchDetail) {
			$dispatch($search, 'header:menu:close', searchDetail);
			searchDetail = null;
		}

		if ($desktopMenus === detail.target || $mobileMenus === detail.target) {
			menusDetail = detail;
		} else if (menusDetail && !isAccountMobile && !isMenuMobile) {
			$dispatch($desktopMenus, 'header:menu:close', menusDetail);
			$dispatch($mobileMenus, 'header:menu:close', menusDetail);
			menusDetail = null;
		}

		if ($inlineTitle === detail.target) {
			inlineTitleDetail = detail;
		} else if (inlineTitleDetail) {
			$dispatch($inlineTitle, 'header:menu:close', inlineTitleDetail);
			inlineTitleDetail = null;
		}

		if ($account === detail.target) {
			accountDetail = detail;
		} else if (accountDetail) {
			$dispatch($account, 'header:menu:close', accountDetail);
			accountDetail = null;
		}

		if ($apps === detail.target) {
			appsDetail = detail;
		} else if (appsDetail) {
			$dispatch($apps, 'header:menu:close', appsDetail);
			appsDetail = null;
		}

		if ($appSwitcher === detail.target) {
			appSwitcherDetail = detail;
		} else if (appSwitcherDetail) {
			$dispatch($appSwitcher, 'header:appSwitcher:close', appSwitcherDetail);
			appSwitcherDetail = null;
		}

		if ($notifications === detail.target) {
			notificationsDetail = detail;
		} else if (notificationsDetail) {
			$dispatch($notifications, 'header:menu:close', notificationsDetail);
			notificationsDetail = null;
		}

		// Update Canvas
		$($headerCanvas, {data: {open: true, state: detail.state}});

		// Update Document Root
		$($header.ownerDocument.documentElement, {data: {'header-is-open': true}});
	});

	/* On Header Menu Close
	/* ====================================================================== */

	$header.addEventListener('header:menu:close', ({detail}) => {
		const currentDetail = detail || searchDetail || inlineTitleDetail || accountDetail || appsDetail || appSwitcherDetail || notificationsDetail || menusDetail || menuDetail;

		if (currentDetail) {
			// Close the Detail
			$(currentDetail.control, {aria: {expanded: false}});
			$(currentDetail.content, {aria: {expanded: false, hidden: true}});

			const isBurger = currentDetail.control.closest && currentDetail.control.closest('.-always-hamburger') !== null;
			const canvasShouldClose = (!viewportIsSmallMedium.matches && !isBurger)
				|| ('menu-close' !== currentDetail.type && 'account-close' !== currentDetail.type);

			if (inlineTitleDetail && inlineTitleDetail.control === currentDetail.control) {
				$dispatch(inlineTitleDetail.content, 'header:inlineTitle:deactivated', currentDetail);
			}

			if (searchDetail && searchDetail.control === currentDetail.control) {
				$dispatch(searchDetail.content.lastChild, 'reset');
			}

			if (searchDetail && searchDetail.target === $inlineSearch && (currentDetail.type === "inlineSearch" || viewportIsSmall.matches)) {
				if (!menusDetail) {
					$dispatch(searchDetail.content, 'header:inlineSearch:deactivated', currentDetail);
				}
			}

			if (appSwitcherDetail && currentDetail === appSwitcherDetail) {
				$dispatch($appSwitcher, 'header:appSwitcher:close', appSwitcherDetail);
			}

			if (canvasShouldClose) {
				// Close the Canvas
				$($headerCanvas, {data: {open: false}});

				// Update Document Root
				$header.ownerDocument.documentElement.removeAttribute('data-header-is-open');
			}
		}
	});

	/* on Inline Search Activated
	/* ====================================================================== */

	$header.addEventListener('header:inlineSearch:activated', ({detail}) => {
		$desktopMenus.querySelector('.esri-header-menus-menu').classList.add('hidden');
		$lineBreak.classList.add('hidden');
		$mobileMenus.querySelector('.esri-header-menus-toggle').classList.add('hidden');
		if (viewportIsSmall) $brand.classList.add('hidden');
	});

	/* on Inline Search Deactivated
	/* ====================================================================== */

	$header.addEventListener('header:inlineSearch:deactivated', ({detail}) => {
		$desktopMenus.querySelector('.esri-header-menus-menu').classList.remove('hidden');
		$lineBreak.classList.remove('hidden');
		$mobileMenus.querySelector('.esri-header-menus-toggle').classList.remove('hidden');
		$brand.classList.remove('hidden');
	});

	/* on Inline Title Activated
	/* ====================================================================== */

	$header.addEventListener('header:inlineTitle:activated', ({detail}) => {
		if (!viewportIsSmall.matches) {
			$desktopMenus.querySelector('.esri-header-menus-content').classList.add('hidden');
			$mobileMenus.querySelector('.esri-header-menus-toggle').classList.add('hidden');
		}
	});

	/* on Inline Title Deactivated
	/* ====================================================================== */

	$header.addEventListener('header:inlineTitle:deactivated', ({detail}) => {
		if (!viewportIsSmallMedium.matches) {
			$desktopMenus.querySelector('.esri-header-menus-content').classList.remove('hidden');
		}
	});

	/* on domnodeinserted
	/* ====================================================================== */

	$header.addEventListener('DOMNodeInserted', function onload() {
		// Get Document and Window
		const $headerDocument = $header.ownerDocument;
		const $headerWindow = $headerDocument.defaultView;

		const $style = $('style');

		let overflowY;

		if ($header.parentNode) {
			// Unbind Node Inserted
			$header.removeEventListener('DOMNodeInserted', onload);

			// Update Header
			$dispatch($header, 'header:update', data);

			/* On Resize
			/* ============================================================== */

			$($headerDocument.head,
				$style
			);

			$headerWindow.addEventListener('orientationchange', onresize);
			$headerWindow.addEventListener('resize', onresize);

			/* On Match Media Change
			/* ============================================================== */

			viewportIsSmall = $headerWindow.matchMedia('(max-width: 768px)');
			viewportIsSmallMedium = $headerWindow.matchMedia('(max-width: 1023px)');

			viewportIsSmall.addListener(onViewportIsSmallChange);
			viewportIsSmallMedium.addListener(onViewportIsSmallMediumChange);

			onViewportIsSmallChange();
			onViewportIsSmallMediumChange();

			onresize();
		}

		function onresize() {
			const height = $headerDocument.documentElement.clientHeight;
			const scrollHeight = $headerDocument.documentElement.scrollHeight;
			const width = scrollHeight > height ? window.innerWidth : $headerDocument.documentElement.clientWidth;

			overflowY = getComputedStyle($headerDocument.documentElement).overflowY.replace('visible', scrollHeight > height ? 'scroll' : 'visible');

			$replaceAll($style,
				`:root{--esri-vw:${width}px;--esri-vh:${height}px}[data-header-is-open]{width:${width}px;height:${height}px;overflow-y:${overflowY}}`
			);

			viewportIsSmallMedium = $headerWindow.matchMedia('(max-width: 1023px)');
			if (viewportIsSmallMedium.matches) {
				$desktopMenus.querySelector('.esri-header-menus-content').classList.add('hidden');
				$mobileMenus.querySelector('.esri-header-menus-content').classList.remove('hidden');
			} else {
				$desktopMenus.querySelector('.esri-header-menus-content').classList.remove('hidden');
				$mobileMenus.querySelector('.esri-header-menus-content').classList.add('hidden');
			}
		}

		function onViewportIsSmallChange() {
			if (viewportIsSmall.matches) {
				$dispatch($header, 'header:breakpoint:s');
				$mobileMenus.lastChild.appendChild($account);
				$notifications.classList.add('hidden');
				$apps.classList.add('hidden');
				$appSwitcher.classList.add('hidden');
			} else {
				$dispatch($header, 'header:breakpoint:not:s');
				$client.appendChild($account);
				$notifications.classList.remove('hidden');
				$apps.classList.remove('hidden');
				$appSwitcher.classList.remove('hidden');
			}
		}

		function onViewportIsSmallMediumChange() {
			if (viewportIsSmallMedium.matches) {
				$dispatch($header, 'header:breakpoint:sm');
			} else {
				$dispatch($header, 'header:breakpoint:not:sm');
				$dispatch($header, 'header:menu:close');
			}
		}
	});

	return $header;
};
