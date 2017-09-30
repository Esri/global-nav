const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const pkg = require('../package.json');

gulp.task('web-server', ()=>{
    browserSync.init({
        open: false,
        port: pkg.gulp_config.server_port,
        server: {
            baseDir: pkg.gulp_config.build_path,
            directory: true
        },
        watchOptions: {
            ignoreInitial: true
        },
	    files: `${pkg.gulp_config.build_path}/**/*`,
        // files: ['html', 'js', 'css', 'gif', 'jpg', 'png', 'json', 'svg'].map((ext)=>`${pkg.gulp_config.src_path}/**/*.${ext}`),
        cors:true,
        reloadOnRestart: true
    });
});
