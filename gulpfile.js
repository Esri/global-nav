// tooling
const buffer = require('vinyl-buffer');
const connect = require('gulp-connect');
const eslit = require('eslit');
const exec = require('child_process').exec;
const gulp = require('gulp');
const path = require('path');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const rollup = require('rollup-stream');
const sass = require('gulp-sass');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const through = require('through2');

/* Dist (copies files and compiles HTML, JS, and CSS)
/* ========================================================================== */

gulp.task('dist', ['dist:files', 'dist:html', 'dist:css', 'dist:js']);

/* Dist:Files (copies files from placeholders to dist)
/* ========================================================================== */

gulp.task('dist:files', () => gulp.src(
	['placeholders/*', 'placeholders/**/*']
).pipe(
	gulp.dest('./dist')
).pipe(
	connect.reload()
));

/* Dist:HTML (copies html saturated with eslit to dist)
/* ========================================================================== */

gulp.task('dist:html', () => gulp.src(
	'./placeholders/demo.html'
).pipe(
	eslitGulp()
).pipe(
	rename('index.html')
).pipe(
	gulp.dest('./dist')
).pipe(
	connect.reload()
));

/* Dist:JS (copies js saturated with rollup to dist)
/* ========================================================================== */

gulp.task('dist:js', () => rollup({
	entry: './placeholders/demo.js',
	format: 'iife',
	sourceMap: true,
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
		}),
		require('rollup-plugin-uglify')()
	]
}).pipe(
	source('gnav.js')
).pipe(
	buffer()
).pipe(
	sourcemaps.init({
		loadMaps: true
	})
).pipe(
	rename('index.js')
).pipe(
	sourcemaps.write('.')
).pipe(
	gulp.dest('./dist')
).pipe(
	connect.reload()
));

/* Dist:CSS (copies css saturated with postcss and sass to dist)
/* ========================================================================== */

gulp.task('dist:css', () => gulp.src(
	'./placeholders/demo.css'
).pipe(
	sourcemaps.init()
).pipe(
	postcss([
		require('postcss-partial-import')(),
		require('postcss-cssnext')({
			autoprefixer: false
		}),
		require('postcss-easings')(),
		require('postcss-short')(),
		require('postcss-svg-fragments')(),
		require('cssnano')({
			autoprefixer: false,
			normalizeUrl: false,
			svgo: false
		})
	], {
		syntax: require('postcss-scss')
	})
).pipe(
	sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError)
).pipe(
	rename('index.css')
).pipe(
	sourcemaps.write('.')
).pipe(
	gulp.dest('./dist')
).pipe(
	connect.reload()
));

/* Live (creates a web server to view your component and watch for changes)
/* ========================================================================== */

gulp.task('live', ['dist'], () => {
	gulp.watch(['placeholders/**'], ['dist:files']);
	gulp.watch(['*.html', 'dependent-html/*.html', 'placeholders/*.html'], ['dist:html']);
	gulp.watch(['*.css', 'dependent-css/*.css', 'placeholders/*.css'], ['dist:css']);
	gulp.watch(['*.js', 'dependent-js/*.js', 'placeholders/*.js'], ['dist:js']);
});

/* Host (creates a web server to view your component and watch for changes)
/* ========================================================================== */

gulp.task('host', ['live'], (cb) => {
	connect.server({
		root: 'dist',
		livereload: true
	});

	exec(`${ process.platform === 'win32' ? 'start' : 'open' } http://localhost:8080/`, (err) => {
		cb(err);
	});
});

/* Default task is: Host
/* ========================================================================== */

gulp.task('default', ['host']);

/* Gulp ESLit Plugin
/* ========================================================================== */

function eslitGulp() {
	return through.obj(
		(file, enc, cb) => {
			if (file.isStream()) {
				return cb(
					guErr('Streaming not supported') // eslint-disable-line no-undef
				);
			} else if (file.isNull()) {
				return cb(null, file);
			}

			return eslit.parse(
				file.contents.toString('utf-8'),
				{},
				{
					cwd: path.dirname(file.path)
				}
			).then(
				(content) => {
					file.contents = new Buffer(content);

					return cb(null, file);
				}
			);
		}
	);
}
