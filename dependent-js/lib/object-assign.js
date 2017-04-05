Object.assign || (Object.assign = function assign(target, source) {
	if (target == null) {
		throw new TypeError('Cannot convert undefined or null to object');
	}

	const to = Object(target);
	const length = arguments.length;
	let index = 0;

	while (++index < length) {
		const nextSource = arguments[index];

		if (nextSource != null) {
			for (let nextKey in nextSource) {
				if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
					to[nextKey] = nextSource[nextKey];
				}
			}
		}
	}

	return to;
});
