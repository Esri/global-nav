const gulp = require('gulp');

require('require-dir')('./gulp-tasks');

gulp.task('default', ["watch-js", "watch-static-files", "web-server"], ()=>{});
gulp.task('build', ["compile-js", "copy-static-files"], ()=>{});
