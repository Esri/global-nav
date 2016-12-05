module.exports = {
	name: 'global-nav',
	dist: 'dist',
	src:  'src',
	html: {
		from:  'src/index.jsx',
		to:    'dist/index.html',
		data:  'src/index.json',
		watch: /\.jsx$|index\.json$/,
		before: [
			'<!doctype html>',
			'<meta charset="utf-8">',
			'<meta name="viewport" content="width=device-width,initial-scale=1">',
			'<meta http-equiv="X-UA-Compatible" content="IE=edge">',
			'<script src="index.js"></script>',
			'<link href="index.css" rel="stylesheet">'
		].join('')
	},
	css: {
		from:  'src/index.css',
		to:    'dist/index.css',
		map:   'dist/index.css.map',
		watch: /\.css$/,
		plugins: [
			require('postcss-partial-import')({
				prefix: ''
			}),
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
		from:  'src/index.js',
		to:    'dist/index.js',
		map:   'dist/index.js.map',
		watch: /\.js$/,
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
		],
		name: 'GlobNav'
	},
	assets: {
		from:  'src/assets',
		to:    'dist/assets',
		watch: /^assets/
	}
};
