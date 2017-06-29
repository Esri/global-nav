/* Tooling
/* ========================================================================== */

import { $, $empty, $attrs, $rmattrs, $bind, $dispatch } from 'esri-global-shared';
import esriSearch from 'esri-global-search';

/* Search
/* ========================================================================== */

const prefix = 'esri-header-search';

export default () => {
	/* Search: Control
	/* ====================================================================== */

	const $controlImage = $('svg', { class: `${prefix}-image`, id: `${prefix}-image` });

	const $control = $('button', {
		class: `${prefix}-control`, id: `${prefix}-control`,
		ariaExpanded: false, ariaControls: `${prefix}-content`
	}, [ $controlImage ]);

	$bind('click', $control, (event) => {
		$dispatch('header:click:search', $control, { event });

		$dispatch('header:menu:toggle', $control, {
			control: $control,
			content: $content,
			state:   'search',
			event
		});
	});

	/* Search: Content
	/* ====================================================================== */

	const $content = $('div', {
		class: `${prefix}-content`, id: `${prefix}-content`,
		ariaExpanded: false, ariaLabelledby: `${prefix}-control`
	});

	/* Search: Target
	/* ====================================================================== */

	const $target = $('div', { class: prefix }, [ $control, $content ]);

	/* Search: On Update
	/* ====================================================================== */

	$bind('header:update:search', $target, ({ detail }) => {
		$attrs($control, { ariaLabel: detail.label });

		if ('string' === typeof detail.image) {
			$rmattrs($controlImage, 'viewBox');

			$empty($controlImage, [
				$('use', { 'href': detail.image })
			]);
		} else {
			$empty($controlImage, detail.image.map(
				(d) => $('path', { d })
			));
		}

		if (detail.dialog) {
			const $dialog = esriSearch(detail.dialog);

			$empty($content, [ $dialog ]);

			$bind('click', $control, (event) => {
				if ('true' === $control.getAttribute('aria-expanded')) {
					$dispatch(`${detail.dialog.prefix}:focus`, $dialog, { event });
				}
			});
		}
	});

	return $target;
};
