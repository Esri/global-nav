/* Esri Search Form, Copyright 2017 Esri

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations
under the License. */

import { $assign as $, $dispatch } from 'esri-global-shared';

/* Search
/* ========================================================================== */

export default (data) => {
	/* Elements
	/* ====================================================================== */

	const $label = $('label', {
		class: `${data.prefix}-label`,
		for: `${data.prefix}-query-control`
	}, data.queryLabel);

	const $control = $('input', {
		class: `${data.prefix}-control`, id: `${data.prefix}-control`,
		type: 'search', name: 'q',
		autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false'
	});

	const $measureTextNode = document.createTextNode('');

	const $measureText = $('div', {
		class: `${data.prefix}-measure-text`,
		aria: { hidden: true }
	}, $measureTextNode);

	const $measure = $('div', { class: `${data.prefix}-measure` }, $measureText);

	const $submit = $('button', {
		class: `${data.prefix}-submit`, type: 'submit',
		aria: { label: data.submitLabel }
	});

	const $search = $('form', {
		class: `${data.prefix}-form`, action: data.action,
		role: 'search', aria: { label: data.label }
	}, $label, $control, $measure, $submit);

	/* Focus Event
	/* ====================================================================== */

	$search.addEventListener(`${data.prefix}:focus`, () => {
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

			$dispatch($search, `${data.prefix}:input`, {
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

			$($label, { data: { filled: '' } });
			$($submit, { data: { filled: '' } });
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
		$dispatch($search, `${data.prefix}:submit`, {
			value: $control.value,
			event
		});
	}

	/* On DOMNodeInserted
	/* ====================================================================== */

	$search.addEventListener('DOMNodeInserted', function onDOMNodeInserted() {
		// If Search now has a parent node
		if ($search.parentNode) {
			// Unbind the DOMNodeInserted method
			$search.removeEventListener('DOMNodeInserted', onDOMNodeInserted);

			// Update Search
			$dispatch($search, `${data.prefix}:update`, data);
		}
	});

	/* On Update
	/* ====================================================================== */

	$search.addEventListener(`${data.prefix}:update`, () => {
		/* Bind Media Event
		/* ====================================================================== */

		const media = $search.ownerDocument.defaultView.matchMedia(data.matchMedia || '(max-width: 720px)');

		media.addListener(oninput);

		/* Bind Other Events
		/* ================================================================== */

		$control.addEventListener('input', oninput);

		$search.addEventListener('reset', oninput);
		$search.addEventListener('submit', onsubmit);
		$search.addEventListener(`${data.prefix}:unload`, onunload);
	});

	return $search;
};
