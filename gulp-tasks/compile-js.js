const gulp = require('gulp');
const rollup = require('rollup');
const pkg = require('../package.json');
const rollup_plugin_babel = require('rollup-plugin-babel');
const babel_plugin_external_helpers = require('babel-plugin-external-helpers');
const rollup_plugin_json = require('rollup-plugin-json');
const rollup_plugin_node_resolve = require('rollup-plugin-node-resolve');
const rollup_plugin_commonjs = require('rollup-plugin-commonjs');
const rollup_plugin_uglify = require('rollup-plugin-uglify');
const babel_preset_env = require('babel-preset-env');


const jsGlob = pkg.gulp_config.src_paths.map((s_path) => `${s_path}/**/*.js`);

function compileJs() {
	rollup.rollup({
		input: './src/header/js/header.js',
		plugins: [
			rollup_plugin_json(),
			rollup_plugin_node_resolve(),
			rollup_plugin_commonjs({
				include: 'node_modules/**'
			}),
			rollup_plugin_babel({
				babelrc: false,
				plugins:[
					babel_plugin_external_helpers
				],
				presets: [
					[babel_preset_env, {
						modules: false,
						targets: {
							"browsers": ['last 2 versions', 'Safari >6', 'IE > 10']
						}
					}]]
			}),
			rollup_plugin_uglify(true)
		]
	}).then((result) => {
		result.write({
			file: `${pkg.gulp_config.build_path}/${pkg.gulp_config.build_name}.js`,
			format: 'umd',
			name: pkg.gulp_config.build_name,
			sourcemap: true
		})
	});
}


gulp.task('compile-js', () => {
	compileJs();
});

gulp.task('watch-js', () => {
	console.log('watching js...');
	watch(jsGlob, () => {
		compileJs();
	});
});
