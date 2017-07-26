/* Esri Language Switcher, Copyright 2017 Esri

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations
under the License. */

import { $, $attrs, $dispatch, $bind, $unbind } from 'esri-global-shared';

/* Language
/* ========================================================================== */

export default (data) => {
	const $choice = $('select', {
		class: `${data.prefix}-choice`,
		autofocus: '',
		ariaLabel: data.optionsLabel
	}, data.options.map(
		(option) => $('option', { value: option.value }, [
			document.createTextNode(option.label)
		])
	));

	const $language = $('form', {
		class: data.prefix,
		ariaLabelledby: `${data.prefix}-message`, ariaDescribedby: 'dialog-description'
	}, [
		$('p', { class: `${data.prefix}-message`, id: `${data.prefix}-message` }, [
			$('strong', {}, [
				document.createTextNode(data.greeting)
			]),
			document.createTextNode(' '),
			document.createTextNode(data.message)
		]),
		$choice,
		$('button', {
			class: `${data.prefix}-submit`,
			type: 'submit',
			ariaLabel: `${ data.submit } ${ data.optionsLabel }`
		}, [
			document.createTextNode(data.submit)
		])
	]);

	$language.addEventListener('submit', (event) => {
		event.preventDefault();

		window.location.href = $choice.value;
	});

	return $language;
};
