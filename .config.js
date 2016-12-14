module.exports = {
	name: 'global-nav',
	html: {},
	css: {
		plugins: [
			require('postcss-partial-import')(),
			require('postcss-cssnext')({
				autoprefixer: false
			}),
			require('postcss-easings')(),
			require('postcss-short')(),
			require('postcss-svg-fragments')(),
			require('cssnano')({
				autoprefixer: false
			})
		]
	},
	js: {
		name: 'GlobNav',
		plugins: [
			require('rollup-plugin-node-resolve')({
				jsnext: true
			}),
			require('rollup-plugin-babel')({
				presets: [
					['es2015', {
						modules: false
					}],
					['stage-2']
				],
				plugins: [
					'external-helpers'
				]
			}),
			require('rollup-plugin-uglify')()
		]
	},
	assets: {}
};
