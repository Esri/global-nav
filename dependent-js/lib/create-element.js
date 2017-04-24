export default function (name, attrs, children) {
	const namespace = `http://www.w3.org/${ /^(use|svg)$/.test(name) ? '2000/svg' : '1999/xhtml' }`;
	const target = document.createElementNS(namespace, name);

	for (let key in attrs) {
		if (name === 'use' && key === 'href') {
			target.setAttributeNS('http://www.w3.org/1999/xlink', key, attrs[key]);
		} else {
			target.setAttribute(key.replace(/[A-Z]/g, '-$&').toLowerCase(), attrs[key]);
		}
	}

	while (children && children.length) {
		target.appendChild(
			children.shift()
		);
	}

	return target;
}
