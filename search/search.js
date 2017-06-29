/* Tooling
/* ========================================================================== */

import { $, $attrs, $dispatch, $bind, $unbind } from 'esri-global-shared';

/* Search
/* ========================================================================== */

export default (data) => {
	/* Elements
	/* ====================================================================== */

	const $label = $('label', { class: `${data.prefix}-label`, for: `${data.prefix}-query-control` }, [
		document.createTextNode(data.queryLabel)
	]);
	const $control = $('input', {
		class: `${data.prefix}-control`, id: `${data.prefix}-control`, type: 'search',
		name: 'q',
		autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false'
	});
	const $measureTextNode = document.createTextNode('');
	const $measureText = $('div', {
		class: `${data.prefix}-measure-text`,
		ariaHidden: 'true'
	}, [ $measureTextNode ]);
	const $measure = $('div', { class: `${data.prefix}-measure` }, [ $measureText ]);
	const $submit = $('button', {
		class: `${data.prefix}-submit`, type: 'submit',
		ariaLabel: data.submitLabel
	});

	const $search = $('form', {
		class: `${data.prefix}-form`, action: data.action,
		role: 'search', ariaLabel: data.label
	}, [ $label, $control, $measure, $submit ]);

	/* Focus Event
	/* ====================================================================== */

	$bind(`${data.prefix}:focus`, $search, () => {
		$control.focus();
	});

	/* On Input
	/* ====================================================================== */

	let controlIsFilled = false;
	let controlValue = '';

	function oninput(event) {
		/* Conditionally Reset Control Value
		/* ================================================================== */

		if (event && 'reset' === event.type) {
			$control.value = '';
		}

		/* Update New Control Value
		/* ================================================================== */

		const newControlValue = $control.value.trim();

		if (newControlValue !== controlValue) {
			controlValue = newControlValue;

			$dispatch(`${data.prefix}:input`, $search, {
				value: controlValue,
				event
			});
		}

		/* Update Label and Submit UI
		/* ================================================================== */

		if (controlIsFilled && !newControlValue) {
			controlIsFilled = false;

			$label.removeAttribute('data-filled');
			$submit.removeAttribute('data-filled');
		} else if (!controlIsFilled && newControlValue) {
			controlIsFilled = true;

			$attrs($label, { dataFilled: '' });
			$attrs($submit, { dataFilled: '' });
		}

		/* Update Measure UI
		/* ================================================================== */

		$measureTextNode.nodeValue = newControlValue;

		const currentWidth = `${$measureText.scrollWidth}px`;

		$measure.style.width = currentWidth;
	}

	/* On Submit
	/* ====================================================================== */

	function onsubmit(event) {
		$dispatch(`${data.prefix}:submit`, $search, {
			value: $control.value,
			event
		});
	}

	/* On DOMNodeInserted
	/* ====================================================================== */

	$bind('DOMNodeInserted', $search, function onDOMNodeInserted() {
		// If Search now has a parent node
		if ($search.parentNode) {
			// Unbind the DOMNodeInserted method
			$unbind('DOMNodeInserted', $search, onDOMNodeInserted);

			// Update Search
			$dispatch(`${data.prefix}:update`, $search, data);
		}
	});

	/* On Update
	/* ====================================================================== */

	$bind(`${data.prefix}:update`, $search, () => {
		/* Bind Media Event
		/* ====================================================================== */

		const media = $search.ownerDocument.defaultView.matchMedia(data.matchMedia || '(max-width: 720px)');

		media.addListener(oninput);

		/* Bind Other Events
		/* ================================================================== */

		$bind('input', $control, oninput);
		$bind('reset', $search, oninput);
		$bind('submit', $search, onsubmit);
		$bind(`${data.prefix}:unload`, $search, onunload);
	});

	return $search;
};
