/* Esri Language Switcher, Copyright 2017 Esri

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations
under the License. */

import { $assign as $ } from 'esri-global-shared';

/* Language
/* ========================================================================== */

export default (data) => {
	const $choice = $('select',
		{
			class: `${data.prefix}-choice`,
			autofocus: '',
			aria: { label: data.optionsLabel }
		},
		...data.options.map(
			(option) => $('option', { value: option.value }, option.label)
		)
	);

	const $language = $('form', {
		class: data.prefix,
		aria: { labelledby: `${data.prefix}-message`, describedby: 'dialog-description' }
	},
		$('p', { class: `${data.prefix}-message`, id: `${data.prefix}-message` },
			$('strong', data.greetingLabel),
			' ',
			data.messageLabel
		),
		$choice,
		$('button', {
			class: `${data.prefix}-submit`,
			type: 'submit',
			aria: { label: `${ data.submitLabel } ${ data.optionsLabel }` }
		}, data.submitLabel)
	);

	$language.addEventListener('submit', (event) => {
		event.preventDefault();

		window.location.href = $choice.value;
	});

	return $language;
};
