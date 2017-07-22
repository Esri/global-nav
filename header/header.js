/* Tooling
/* ========================================================================== */

import { $, $attrs, $rmattrs, $append, $empty, $bind, $unbind, $dispatch, $fetch } from 'esri-global-shared';

/* Header
/* ========================================================================== */

import createAccount from './dependent-js/account';
import createBrand   from './dependent-js/brand';
import createMenus   from './dependent-js/menus';
import createSearch  from './dependent-js/search';

/* Header: Constants
/* ========================================================================== */

const defaultURL = '/esri-header.json';

/* Header: Create from Default (URL)
/* ========================================================================== */

function createFromDefault(callback) {
	$fetch(defaultURL, callback);
}

/* Header: Create from URL
/* ========================================================================== */

function createFromURL(url, callback) {
	$fetch(url, callback);
}

/* Header: Create (from Object)
/* ====================================================================== */

function create(data) {
	let lastDetail;
	let rootDetail;
	let viewportIsSmall;
	let viewportIsSmallMedium;

	/* Canvas
	/* ====================================================================== */

	const $headerCanvas = $('button', {
		class: 'esri-header-canvas',
		tabindex: '-1',
		dataOpen: false
	});

	$bind('click', $headerCanvas, () => {
		$dispatch('header:menu:close', $headerCanvas);
	});

	/* Elements
	/* ====================================================================== */

	const $brand   = createBrand();
	const $account = createAccount();
	const $client  = $('div', { class: 'esri-header-client' }, [ $account ]);
	const $menus   = createMenus();
	const $search  = createSearch();

	const $header = $('div', { class: `esri-header -${data.theme || 'web'}` }, [
		$headerCanvas,
		$brand,
		$menus,
		$search,
		$client
	]);

	/* On Header Update
	/* ====================================================================== */

	$bind('header:update', $header, ({ detail }) => {
		if (detail.brand) {
			$dispatch('header:update:brand', $brand, detail.brand);
		}

		if (detail.menus) {
			$dispatch('header:update:menus', $menus, detail.menus);
		}

		if (detail.search) {
			$dispatch('header:update:search', $search, detail.search);
		}

		if (detail.account) {
			$dispatch('header:update:account', $client.lastChild, detail.account);
		}
	});

	/* On Header Menu Toggle
	/* ====================================================================== */

	$bind('header:menu:toggle', $header, ({ detail }) => {
		const submenuShouldOpen = 'true' !== detail.control.getAttribute('aria-expanded');
		const eventType = submenuShouldOpen ? 'header:menu:open' : 'header:menu:close';

		$dispatch(eventType, detail.control, detail);
	});

	/* On Header Menu Open
	/* ====================================================================== */

	$bind('header:menu:open', $header, ({ detail }) => {
		if (detail) {
			if (lastDetail) {
				$dispatch('header:menu:close', lastDetail.control, lastDetail);
			}

			// Update Control, Content
			$attrs(detail.control, { ariaExpanded: true });
			$attrs(detail.content, { ariaExpanded: true, ariaHidden: false });

			// Update Canvas
			$attrs($headerCanvas, { dataOpen: true, dataState: detail.state });

			// Update HTML
			$attrs($header.ownerDocument.documentElement, { dataHeaderIsOpen: '' });

			if (detail.root) {
				rootDetail = detail;
			} else {
				lastDetail = detail;
			}
		}
	});

	/* On Header Menu Close
	/* ====================================================================== */

	$bind('header:menu:close', $header, ({ detail }) => {
		if (detail) {
			// Close the Detail
			$attrs(detail.control, { ariaExpanded: false });
			$attrs(detail.content, { ariaExpanded: false, ariaHidden: true });

			if (!rootDetail || detail.root || 'search' === detail.state) {
				// Close the Canvas
				$attrs($headerCanvas, { dataOpen: false });

				// Update HTML
				$rmattrs($header.ownerDocument.documentElement, 'dataHeaderIsOpen');
			}
		} else {
			if (lastDetail) {
				// Close the Detail
				$attrs(lastDetail.control, { ariaExpanded: false });
				$attrs(lastDetail.content, { ariaExpanded: false, ariaHidden: true });

				lastDetail = null;
			}

			if (rootDetail) {
				// Close the Detail
				$attrs(rootDetail.control, { ariaExpanded: false });
				$attrs(rootDetail.content, { ariaExpanded: false, ariaHidden: true });

				rootDetail = null;
			}

			// Close the Canvas
			$attrs($headerCanvas, { dataOpen: false });

			// Update HTML
			$rmattrs($header.ownerDocument.documentElement, 'dataHeaderIsOpen');
		}
	});

	/* On DOMNodeInserted
	/* ====================================================================== */

	$bind('DOMNodeInserted', $header, function onload() {
		// Get Document and Window
		const $headerDocument = $header.ownerDocument;
		const $headerWindow   = $headerDocument.defaultView;

		const $style = $('style');

		let overflowY;

		if ($header.parentNode) {
			// Unbind Node Inserted
			$unbind('DOMNodeInserted', $header, onload);

			// Update Header
			$dispatch('header:update', $header, data);

			/* On Resize
			/* ============================================================== */

			$append($headerDocument.head, [ $style ]);

			$bind('resize', $headerWindow, onresize);

			onresize();

			/* On Match Media Change
			/* ============================================================== */

			viewportIsSmall       = $headerWindow.matchMedia('(max-width: 767px)');
			viewportIsSmallMedium = $headerWindow.matchMedia('(max-width: 1023px)');

			viewportIsSmall.addListener(onViewportIsSmallChange);
			viewportIsSmallMedium.addListener(onViewportIsSmallMediumChange);

			onViewportIsSmallChange();
			onViewportIsSmallMediumChange();
		}

		function onresize() {
			const width  = $headerDocument.documentElement.clientWidth;
			const height = $headerDocument.documentElement.clientHeight;
			const scrollHeight = $headerDocument.documentElement.scrollHeight;

			overflowY = getComputedStyle($headerDocument.documentElement).overflowY.replace('visible', () => {
				return scrollHeight > height ? 'scroll' : 'visible';
			});

			$empty($style, [ document.createTextNode(`[data-header-is-open]{width:${width}px;height:${height}px;overflow-y:${overflowY}}`) ]);
		}

		function onViewportIsSmallChange() {
			if (viewportIsSmall.matches) {
				$dispatch('header:breakpoint:s', $header);

				$menus.lastChild.appendChild($account);
			} else {
				$dispatch('header:breakpoint:not:s', $header);

				$client.appendChild($account);
			}
		}

		function onViewportIsSmallMediumChange() {
			if (viewportIsSmallMedium.matches) {
				$dispatch('header:breakpoint:sm', $header);

				$attrs($menus.lastChild, { ariaHidden: 'false' === $menus.lastChild.getAttribute('aria-expanded') });
			} else {
				$dispatch('header:breakpoint:not:sm', $header);

				$attrs($menus.lastChild, { ariaHidden: false });
			}
		}
	});

	return $header;
}

export default {
	create,
	createFromURL,
	createFromDefault
};
