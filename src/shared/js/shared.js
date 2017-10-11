import {$assign, $fetch, $replaceAll} from 'domose';

/* Dispatch an Custom Event with a detail
/* ========================================================================== */

function $dispatch(target, type, detail) {
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

function $renderSvgOrImg({imgDef = "", imgClass = "", imgWidth, imgHeight, viewBox, id}) {
	let $img;

	const svgProps = {class: imgClass, role: 'presentation'};
	if (imgWidth && imgHeight) {
		svgProps.width = imgWidth;
		svgProps.height = imgHeight;
	}
	if (viewBox) {
		svgProps.viewBox = viewBox;
	}

	if (typeof imgDef === 'string') {
		if (imgDef.indexOf('.svg') === imgDef.length - 4) {
			$img = $assign(
				document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
				svgProps
			);
			$fetch(imgDef, (svgContents) => {
				$img.innerHTML = svgContents;
			});
		} else {
			$img = $assign('img', {
				src: imgDef,
				class: imgClass
			});
		}
	} else {
		$img = $assign(document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
			svgProps,
			$assign(document.createDocumentFragment(),
				...imgDef.map(
					(d) => $assign(
						document.createElementNS('http://www.w3.org/2000/svg', 'path'),
						{d}
					)
				)
			));
	}
	if (id) {
		$img.id = id;
	}

	return $img;
}

export {
	$assign,
	$dispatch,
	$enableFocusRing,
	$fetch,
	$replaceAll,
	$renderSvgOrImg
};
