const gulp = require('gulp');

require('require-dir')('./gulp-tasks');

gulp.task('default', ["watch-js", "watch-postcss", "watch-static-files", "web-server"], ()=>{});
gulp.task('build', ["compile-js", "compile-postcss", "copy-static-files"], ()=>{});
