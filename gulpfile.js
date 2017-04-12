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
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const through = require('through2');

// Task: Default
gulp.task('default', ['placeholders', 'html', 'css', 'js', 'connect', 'watch', 'launch']);

// Task: Connect
gulp.task('connect', () => {
	connect.server({
		root: 'dist',
		livereload: true
	});
});

// Task: Watch
gulp.task('watch', () => {
	gulp.watch(['placeholders/**'], ['placeholders']);
	gulp.watch(['*.html', 'dependent-html/*.html', 'placeholders/*.html'], ['html']);
	gulp.watch(['*.css', 'dependent-css/*.css', 'placeholders/*.css'], ['css']);
	gulp.watch(['*.js', 'dependent-js/*.js', 'placeholders/*.js'], ['js']);
});

// Task: HTML
gulp.task(
	'html',
	() => gulp.src(
		'./placeholders/demo.html'
	).pipe(
		eslitGulp()
	).pipe(
		rename('index.html')
	).pipe(
		gulp.dest('./dist')
	).pipe(
		connect.reload()
	)
);

// Task: JS
gulp.task(
	'js',
	() => rollup({
		entry: './placeholders/demo.js',
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
	)
);

// Task: CSS
gulp.task(
	'css', () => gulp.src(
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
		rename('index.css')
	).pipe(
		sourcemaps.write('.')
	).pipe(
		gulp.dest('./dist')
	).pipe(
		connect.reload()
	)
);

// Task: Placeholders
gulp.task(
	'placeholders', () => gulp.src(
		['placeholders/*', 'placeholders/**/*']
	).pipe(
		gulp.dest('./dist')
	)
);

gulp.task(
	'launch', (cb) => {
		exec(`${ process.platform === 'win32' ? 'start' : 'open' } http://localhost:8080/`, (err) => {
			cb(err);
		});
	}
);

// ESLit as a Gulp Plugin
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
