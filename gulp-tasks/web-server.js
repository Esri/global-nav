const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const pkg = require('../package.json');

gulp.task('web-server', (done) => {
	browserSync.init({
		open: false,
		port: pkg.gulp_config.server_port,
		ui:{
			port: 3003
		},
		server: {
			baseDir: pkg.gulp_config.build_path,
			index: "index.html"
		},
		watch: true,
		cors: true,
		reloadOnRestart: true,
		notify: false,
		ui: false
	}, done);
});
