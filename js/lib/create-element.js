export default function (name, attrs, children) {
	const namespace = /^(use|svg)$/.test(name) ? '2000/svg' : '1999/xhtml';
	const target = document.createElementNS(`http://www.w3.org/${ namespace }`, name);

	for (let key in attrs) {
		target.setAttribute(key.replace(/[A-Z]/g, '-$&').toLowerCase(), String(attrs[key]).replace(/(^|\s)-/g, '$1esri-gnav-'));
	}

	while (children && children.length) {
		target.appendChild(
			children.shift()
		);
	}

	return target;
}
