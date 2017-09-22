// tooling
const postcss = require('postcss');

// plugin
module.exports = postcss.plugin('postcss-discard-tested-duplicate-declarations', (opts) => (root) => {
	const testProp  = opts && 'testProp' in opts ? opts.testProp : (prop) => !/^:*-/.test(prop);
	const testValue = opts && 'testValue' in opts ? opts.testValue : (value) => !/^(\s*-|var)/.test(value);

	root.walkRules((rule) => {
		var propsMap = {};

		rule.nodes.slice(0).forEach((decl) => {
			if (testProp(decl.prop) && testValue(decl.value)) {
				const prevDecl = propsMap[decl.prop];

				if (prevDecl) {
					if (decl.import || !prevDecl.import) {
						prevDecl.remove();

						propsMap[decl.prop] = decl;
					} else {
						decl.remove();
					}
				} else {
					propsMap[decl.prop] = decl;
				}
			}
		})
	});
});
