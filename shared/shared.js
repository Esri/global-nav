import { $assign, $fetch, $replaceAll } from 'domose';

/* Dispatch an Custom Event with a detail
/* ========================================================================== */

function $dispatch(target, type, detail) {
	// an event
	const event = document.createEvent('CustomEvent');

	event.initCustomEvent(type, true, true, detail);

	target.dispatchEvent(event);
}

export {
	$assign,
	$dispatch,
	$fetch,
	$replaceAll
};
