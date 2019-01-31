const gulp = require('gulp');

require('require-dir')('./gulp-tasks');

gulp.task("watch", gulp.parallel("watch-es-lint", "watch-js", "watch-postcss", "watch-optimize-images", "watch-static-files"));

gulp.task("default", gulp.series("clean-dist", "web-server", "watch"));

gulp.task("build", gulp.series("clean-dist", "compile-js", "compile-postcss", "optimize-images", "copy-static-files"));
