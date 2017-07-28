var $esriLanguage = 'function' === typeof esriLanguage ? esriLanguage({
	prefix: 'esri-language',
	label: 'Switch Languages',
	button: 'United States (English)',
	submit: 'Change',
	greeting: 'Hello!',
	message: 'You are seeing the English page. Is this correct?',
	close: 'Close Navigation',
	optionsLabel: 'Desired Language',
	options: [
		{
			label: 'English',
			value: '#the-english-page'
		},
		{
			label: 'French',
			value: '#the-french-page'
		}, {
			label: 'Spanish',
			value: '#the-spanish-page'
		}
	]
}) : null;

// when the document content has loaded
document.addEventListener('DOMContentLoaded', function () {
	const $barrier = document.querySelector('.esri-language-barrier');

	if ($esriLanguage && $barrier) {
		$barrier.appendChild($esriLanguage);
	}
});
