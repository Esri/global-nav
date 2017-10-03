const gulp = require('gulp');

require('require-dir')('./gulp-tasks');

gulp.task('default', ["clean-dist", "watch-es-lint", "watch-js", "watch-postcss", "watch-static-files", "web-server"], () => {});
gulp.task('build', ["clean-dist", "compile-js", "compile-postcss", "copy-static-files"], () => {});
