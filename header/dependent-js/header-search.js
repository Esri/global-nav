/* Tooling
/* ========================================================================== */

import { $assign as $, $dispatch, $replaceAll } from 'esri-global-shared';

import esriSearch from 'esri-global-search';

/* Search
/* ========================================================================== */

const prefix = 'esri-header-search';

export default () => {
	/* Search: Control
	/* ====================================================================== */

	const $controlImage = $(
		document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
		{ class: `${prefix}-image`, id: `${prefix}-image` }
	);

	const $control = $('button',
		{
			class: `${prefix}-control`, id: `${prefix}-control`,
			aria: { expanded: false, controls: `${prefix}-content` }
		},
		$controlImage
	);

	$control.addEventListener('click', (event) => {
		$dispatch($control, 'header:click:search', { event });

		$dispatch($control, 'header:menu:toggle', {
			control: $control,
			content: $content,
			state:   'search',
			target:  $target,
			type:    'search-toggle',
			event
		});
	});

	/* Search: Content
	/* ====================================================================== */

	const $content = $('div', {
		class: `${prefix}-content`, id: `${prefix}-content`,
		aria: { expanded: false, labelledby: `${prefix}-control` }
	});

	/* Search: Target
	/* ====================================================================== */

	const $target = $('div', { class: prefix },
		$control, $content
	);

	/* Search: On Update
	/* ====================================================================== */

	$target.addEventListener('header:update:search', ({ detail }) => {
		$($control, { aria: { label: detail.label } });

		if ('string' === typeof detail.image) {
			$controlImage.removeAttribute('viewBox');

			$replaceAll($controlImage,
				$('use', { 'href': detail.image })
			);
		} else {
			$replaceAll($controlImage,
				...detail.image.map(
					(d) => $(
						document.createElementNS('http://www.w3.org/2000/svg', 'path'),
						{ d }
					)
				)
			);
		}

		if (detail.dialog) {
			detail.dialog.prefix = 'esri-header-search-dialog';

			const $dialog = esriSearch(detail.dialog);

			const $dialogCancelButton = $('button', {
				class: 'esri-header-search-dialog-cancel',
				type: 'reset'
			},
				$('span',
					detail.dialog.cancelLabel
				)
			);

			$dialogCancelButton.addEventListener('click', (event) => {
				$dispatch($control, 'header:menu:close', {
					control: $control,
					content: $content,
					state:   'search',
					type:    'search-close',
					event
				});
			});

			$($dialog,
				$dialogCancelButton
			);

			$replaceAll($content,
				$dialog
			);

			$control.addEventListener('click', (event) => {
				if ('true' === $control.getAttribute('aria-expanded')) {
					$dispatch($dialog, `${detail.dialog.prefix}:focus`, { event });
				}
			});
		}
	});

	return $target;
};
