import { $assign, $fetch, $replaceAll } from 'domose';

/* Dispatch an Custom Event with a detail
/* ========================================================================== */

function $dispatch(target, type, detail) {
	alert('shared-dispatch');
	// an event
	const event = document.createEvent('CustomEvent');

	event.initCustomEvent(type, true, true, detail);

	target.dispatchEvent(event);
}

function $enableFocusRing(target) {
	// retooled from https://github.com/jonathantneal/js-focus-ring

	let keyboardThrottleTimeoutID;

	const activeElements = [];

	target.addEventListener('blur', () => {
		activeElements.forEach((activeElement) => {
			activeElement.removeAttribute('js-focus');
			activeElement.removeAttribute('js-focus-ring');
		});
	}, true);

	target.addEventListener('focus', () => {
		const activeElement = document.activeElement;

		if (activeElement instanceof Element) {
			activeElement.setAttribute('js-focus', '');

			if (keyboardThrottleTimeoutID) {
				activeElement.setAttribute('js-focus-ring', '');
			}

			activeElements.push(activeElement);
		}
	}, true);

	target.addEventListener('keydown', () => {
		keyboardThrottleTimeoutID = clearTimeout(keyboardThrottleTimeoutID) || setTimeout(() => {
			keyboardThrottleTimeoutID = 0;
		}, 100);
	}, true);
}

export {
	$assign,
	$dispatch,
	$enableFocusRing,
	$fetch,
	$replaceAll
};
