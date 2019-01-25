const gulp = require("gulp");
const watch = require('gulp-watch');
const logger = require('gulp-logger');

const pkg = require('../package.json');

const staticGlob = ['html', 'css', 'json','jpg'].map((ext) => `${pkg.gulp_config.src_path}/**/*.${ext}`);

function copyStaticFiles(staticPaths) {
	gulp.src(staticPaths, {base: pkg.gulp_config.src_path})
		.pipe(logger({
			before: 'Copying static files...',
			after: 'Copying static files complete!',
			showChange: true
		}))
		.pipe(gulp.dest(pkg.gulp_config.build_path));
}

gulp.task('copy-static-files', () => {
	console.log('copy-static-files');
	copyStaticFiles(staticGlob);
});

gulp.task('copy-to-components', () => {
	console.log('copy-to-components');
	const compiledFiles = ['./dist/esri-global-nav.css', './dist/esri-global-nav.js'];
	watch(compiledFiles, () => {
		gulp.src(compiledFiles)
		.pipe(logger({
			before: 'Copying static files to components...',
			after: 'Copying static files to components complete!',
			showChange: true
		}))
		.pipe(gulp.dest('../../EsriComponents/webapps-cdn-components/src/global-nav/core'));
	});
});

gulp.task('watch-static-files', () => {
	console.log('watching Static Files...');
	copyStaticFiles(staticGlob);
	watch(staticGlob, (modFile) => {
		copyStaticFiles([modFile.path]);
	});
});

