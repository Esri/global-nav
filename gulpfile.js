// tooling
const buffer = require('vinyl-buffer');
const connect = require('gulp-connect');
const eslit = require('gulp-eslit');
const exec = require('child_process').exec;
const gulp = require('gulp');
const gulpif = require('gulp-if');
const path = require('path');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const rollup = require('rollup-stream');
const sass = require('gulp-sass');
const size = require('gulp-size');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

const opts = require('./gulp_options');

/* Dist (installs dependencies, copies files, and compiles HTML, JS, and CSS)
/* ========================================================================== */

gulp.task('dist', ['dist:npm'], () => gulp.start('dist:files', 'dist:html', 'dist:css', 'dist:js'));

/* Dist:NPM (installs dependencies)
/* ========================================================================== */

gulp.task('dist:npm', (cb) => {
	exec('npm install --production', (err) => {
		cb(err);
	});
});

/* Dist:Files (copies files from placeholders to dist)
/* ========================================================================== */

gulp.task('dist:files', () => opts.paths.files ? gulp.src(
	[`${ opts.paths.files }/*`, `${ opts.paths.files }/**/*`]
).pipe(
	gulp.dest(opts.server.root)
).pipe(
	connect.reload()
) : []);

/* Dist:HTML (copies html saturated with eslit to dist)
/* ========================================================================== */

gulp.task('dist:html', () => opts.paths.html ? gulp.src(
	opts.paths.html
).pipe(
	eslit(opts.eslitConfig)
).pipe(
	rename((pathdata) => renamer(pathdata, opts.htmlDest))
).pipe(
	gulp.dest(opts.server.root)
).pipe(
	size({
		gzip: true,
		showFiles: true,
		title: 'Size of:'
	})
).pipe(
	connect.reload()
) : []);

/* Dist:JS (copies js saturated with rollup to dist)
/* ========================================================================== */

gulp.task('dist:js', () => opts.paths.js ? [].concat(opts.paths.js).map(
	(jsPath, index) => rollup(
		Object.assign(
			{
				entry: jsPath,
				format: opts.jsModuleFormat,
				name: opts.jsModuleName,
				sourcemap: true
			},
			opts.rollupConfig,
			{
				plugins: [
					require('rollup-plugin-json')(),
					require('rollup-plugin-node-resolve')(),
					require('rollup-plugin-commonjs')({
						include: 'node_modules/**'
					}),
					require('rollup-plugin-babel')({
						babelrc: false,
						plugins: [
							require('babel-plugin-external-helpers')
						],
						presets: [
							[
								require('babel-preset-env'),
								{
									modules: false
								}
							]
						]
					})
				].concat(
					opts.compressJS ? require('rollup-plugin-uglify')(opts.compressJS) : []
				)
			}
		)
	).pipe(
		source(jsPath)
	).pipe(
		buffer()
	).pipe(
		sourcemaps.init({
			loadMaps: true
		})
	).pipe(
		rename((pathdata) => renamer(pathdata, Array.isArray(opts.jsDest) ? opts.jsDest[index] : opts.jsDest))
	).pipe(
		size({
			gzip: true,
			showFiles: true,
			title: 'Size of:'
		})
	).pipe(
		sourcemaps.write('.')
	).pipe(
		gulp.dest(opts.server.root)
	).pipe(
		connect.reload()
	)
) : []);

/* Dist:CSS (copies css saturated with postcss and sass to dist)
/* ========================================================================== */

gulp.task('dist:css', () => opts.paths.css ? gulp.src(
	opts.paths.css
).pipe(
	sourcemaps.init()
).pipe(
	gulpif(
		opts.uses.postcss,
		postcss(
			[
				require('postcss-partial-import')(),
				require('postcss-custom-properties')({
					warnings: false
				}),
				require('postcss-apply')(),
				require('postcss-image-set-polyfill')(),
				require('postcss-logical')(),
				require('postcss-nesting')(),
				require('postcss-media-fn')(),
				require('postcss-custom-media')(),
				require('postcss-media-minmax')(),
				require('postcss-custom-selectors')(),
				require('postcss-attribute-case-insensitive')(),
				require('postcss-color-rebeccapurple')(),
				require('postcss-color-hwb')(),
				require('postcss-color-hsl')(),
				require('postcss-color-rgb')(),
				require('postcss-color-gray')(),
				require('postcss-color-hex-alpha')(),
				require('postcss-color-function')(),
				require('postcss-font-family-system-ui')(),
				require('postcss-font-variant')(),
				require('postcss-initial')(),
				require('postcss-selector-matches')(),
				require('postcss-selector-not')(),
				require('postcss-pseudo-class-any-link')(),
				require('postcss-dir-pseudo-class')(opts.cssDir ? {
					dir: opts.cssDir
				} : {}),
				require('postcss-replace-overflow-wrap')(),
				require('postcss-easings')(),
				require('postcss-short')(),
				require('postcss-svg')(),
				require('autoprefixer')()
			].concat(
				opts.compressCSS ? [
					require('cssnano')({
						preset: ['default', opts.compressCSS]
					}),
					require('./lib/postcss-discard-tested-duplicate-declarations')()
				 ] : []
			),
			Object.assign(
				{},
				opts.postcssConfig,
				opts.cssSyntax === 'scss' ? {
					syntax: require('postcss-scss')
				} : {}
			)
		)
	)
).pipe(
	gulpif(
		opts.uses.sass,
		sass(opts.compressCSS ? opts.compressCSS.sass : {}).on('error', sass.logError)
	)
).pipe(
	rename((pathdata) => renamer(pathdata, opts.cssDest))
).pipe(
	size({
		gzip: true,
		showFiles: true,
		title: 'Size of:'
	})
).pipe(
	sourcemaps.write('.')
).pipe(
	gulp.dest(opts.server.root)
).pipe(
	connect.reload()
) : []);

/* Live (creates a web server to view your component and watch for changes)
/* ========================================================================== */

gulp.task('live', ['dist'], () => {
	gulp.watch(opts.watch.files, ['dist:files']);
	gulp.watch(opts.watch.html,  ['dist:html']);
	gulp.watch(opts.watch.css,   ['dist:css']);
	gulp.watch(opts.watch.js,    ['dist:js']);
});

/* Host (creates a web server to view your component and watch for changes)
/* ========================================================================== */

gulp.task('host', ['live'], (cb) => {
	connect.server(opts.server);

	if (opts.server.openBrowser) {
		exec(`${ process.platform === 'win32' ? 'start' : 'open' } http${ opts.server.https ? 's' : '' }://${ opts.server.host }:${ opts.server.port }/`, (err) => {
			cb(err);
		});
	}
});

/* Default task is: Host
/* ========================================================================== */

gulp.task('default', ['host']);

/* Renamer (renames a destination file)
/* ========================================================================== */

function renamer(pathdata, dest) {
	const basepath = `${pathdata.basename}${pathdata.extname}`;

	if (dest === Object(dest) && basepath in dest) {
		const newpathdata = path.parse(dest[basepath]);

		pathdata.basename = newpathdata.name;
		pathdata.extname = newpathdata.ext;
	} else if (dest instanceof Array) {
		const newpathindex = opts.paths.css.indexOf(
			path.resolve(pathdata.dirname, basepath)
		);

		if (newpathindex !== -1) {
			const newpathdata = path.parse(dest[newpathindex]);

			pathdata.basename = newpathdata.name;
			pathdata.extname = newpathdata.ext;
		}
	} else if (typeof dest === 'string') {
		const newpathdata = path.parse(dest);

		pathdata.basename = newpathdata.name;
		pathdata.extname = newpathdata.ext;
	}
}
