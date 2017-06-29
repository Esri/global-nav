// create an element
function $(name, attrs, nodes, cb) { // eslint-disable-line max-params
	// an element with the appropriate namespace
	const element = /^(circle|g|use|path|svg)$/.test(name)
	? document.createElementNS('http://www.w3.org/2000/svg', name)
	: document.createElement(name);

	// set attributes
	$attrs(element, attrs);

	// append child nodes
	$append(element, nodes);

	// the element, conditionally modified by the callback
	return cb && cb(element) || element;
}

// append child nodes
function $append(element, nodes) {
	for (let node in nodes) {
		element.appendChild(nodes[node]);
	}
}

// empty an element
function $empty(element, nodes) {
	while (element.lastChild) {
		element.removeChild(element.lastChild);
	}

	for (let node in nodes) {
		element.appendChild(nodes[node]);
	}
}

// set attributes
function $attrs(element, attrs) {
	// set attributes with their appropriate namespace
	for (let attr in attrs) {
		if ('href' === attr && 'use' === element.nodeName) {
			element.setAttributeNS('http://www.w3.org/1999/xlink', attr, attrs[attr]);
		} else {
			element.setAttribute(
				'viewBox' === attr
				? attr
				: attr.replace(/[A-Z]/g, '-$&').toLowerCase(),
				attrs[attr]
			);
		}
	}
}

// remove attributes
function $rmattrs(element, attrs) {
	attrs.split(/\s+/).forEach(
		(attr) => {
			element.removeAttribute(
				'viewBox' === attr
				? attr
				: attr.replace(/[A-Z]/g, '-$&').toLowerCase()
			);
		}
	);
}

// dispatch an event
function $dispatch(type, target, detail) {
	// an event
	const event = document.createEvent('CustomEvent');

	event.initCustomEvent(type, true, true, detail);

	target.dispatchEvent(event);
}

// bind an event
function $bind(type, target, callback) {
	target.addEventListener(type, callback);
}

// unbind an event
function $unbind(type, target, callback) {
	target.removeEventListener(type, callback);
}

function $fetch(url, callback) {
	const xhr = new XMLHttpRequest();

	$bind('readystatechange', xhr, () => {
		if (4 === xhr.readyState && 200 === xhr.status) {
			callback(xhr.responseText); // eslint-disable-line callback-return
		}
	});

	xhr.open('GET', url);
	xhr.send();
}

export default $;

export {
	$,
	$append,
	$empty,
	$attrs,
	$rmattrs,
	$bind,
	$unbind,
	$dispatch,
	$fetch
};
