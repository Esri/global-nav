/* Global Header, Copyright 2017 Esri

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations
under the License. */

import { $assign as $, $dispatch, $replaceAll } from 'esri-global-shared';

import createAccount from './header-account';
import createBrand   from './header-brand';
import createMenus   from './header-menus';
import createSearch  from './header-search';

/* Header
/* ====================================================================== */

export default (data) => {
	let lastDetail;
	let rootDetail;
	let viewportIsSmall;
	let viewportIsSmallMedium;

	/* Canvas
	/* ====================================================================== */

	const $headerCanvas = $('button', {
		class: 'esri-header-canvas',
		tabindex: '-1',
		data: { open: false }
	});

	$headerCanvas.addEventListener('click', () => {
		$dispatch($headerCanvas, 'header:menu:close');
	});

	/* Elements
	/* ====================================================================== */

	const $brand   = createBrand();
	const $account = createAccount();
	const $menus   = createMenus();
	const $search  = createSearch();

	const $client  = $('div', { class: 'esri-header-client' },
		$account
	);

	const $header = $('div', { class: `esri-header -${data.theme || 'web'}` },
		$headerCanvas,
		$brand,
		$menus,
		$search,
		$client
	);

	/* On Header Update
	/* ====================================================================== */

	$header.addEventListener('header:update', ({ detail }) => {
		if (detail.brand) {
			$dispatch($brand, 'header:update:brand', detail.brand);
		}

		if (detail.menus) {
			$dispatch($menus, 'header:update:menus', detail.menus);
		}

		if (detail.search) {
			$dispatch($search, 'header:update:search', detail.search);
		}

		if (detail.account) {
			$dispatch($client.lastChild, 'header:update:account', detail.account);
		}
	});

	/* On Header Menu Toggle
	/* ====================================================================== */

	$header.addEventListener('header:menu:toggle', ({ detail }) => {
		const submenuShouldOpen = 'true' !== detail.control.getAttribute('aria-expanded');
		const eventType = submenuShouldOpen ? 'header:menu:open' : 'header:menu:close';

		$dispatch(detail.control, eventType, detail);
	});

	/* On Header Menu Open
	/* ====================================================================== */

	$header.addEventListener('header:menu:open', ({ detail }) => {
		if (detail) {
			if (lastDetail) {
				$dispatch(lastDetail.control, 'header:menu:close', lastDetail);
			}

			// Update Control, Content
			$(detail.control, { aria: { expanded: true } });
			$(detail.content, { aria: { expanded: true, hidden: false } });

			// Update Canvas
			$($headerCanvas, { data: { open: true, state: detail.state } });

			// Update HTML
			$($header.ownerDocument.documentElement, { data: { 'header-is-open': true } });

			if (detail.root) {
				rootDetail = detail;
			} else {
				lastDetail = detail;
			}
		}
	});

	/* On Header Menu Close
	/* ====================================================================== */

	$header.addEventListener('header:menu:close', ({ detail }) => {
		if (detail) {
			// Close the Detail
			$(detail.control, { aria: { expanded: false } });
			$(detail.content, { aria: { expanded: false, hidden: true } });

			if (!rootDetail || detail.root || 'search' === detail.state) {
				// Close the Canvas
				$($headerCanvas, { data: { open: false } });

				// Update HTML
				$header.ownerDocument.documentElement.removeAttribute('data-header-is-open');
			}
		} else {
			if (lastDetail) {
				// Close the Detail
				$(lastDetail.control, { aria: { expanded: false } });
				$(lastDetail.content, { aria: { expanded: false, hidden: true } });

				lastDetail = null;
			}

			if (rootDetail) {
				// Close the Detail
				$(rootDetail.control, { aria: { expanded: false } });
				$(rootDetail.content, { aria: { expanded: false, hidden: true } });

				rootDetail = null;
			}

			// Close the Canvas
			$($headerCanvas, { data: { open: false } });

			// Update HTML
			$header.ownerDocument.documentElement.removeAttribute('data-header-is-open');
		}
	});

	/* On DOMNodeInserted
	/* ====================================================================== */

	$header.addEventListener('DOMNodeInserted', function onload() {
		// Get Document and Window
		const $headerDocument = $header.ownerDocument;
		const $headerWindow   = $headerDocument.defaultView;

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

			$replaceAll($style,
				`:root{--esri-vw:${width}px;--esri-vh:${height}px}[data-header-is-open]{width:${width}px;height:${height}px;overflow-y:${overflowY}}`
			);
		}

		function onViewportIsSmallChange() {
			if (viewportIsSmall.matches) {
				$dispatch($header, 'header:breakpoint:s');

				$menus.lastChild.appendChild($account);
			} else {
				$dispatch($header, 'header:breakpoint:not:s');

				$client.appendChild($account);
			}
		}

		function onViewportIsSmallMediumChange() {
			if (viewportIsSmallMedium.matches) {
				$dispatch($header, 'header:breakpoint:sm');

				$($menus.lastChild, { aria: { hidden: 'false' === $menus.lastChild.getAttribute('aria-expanded') } });
			} else {
				$dispatch($header, 'header:breakpoint:not:sm');

				$($menus.lastChild, { aria: { hidden: false } });
			}
		}
	});

	return $header;
};
