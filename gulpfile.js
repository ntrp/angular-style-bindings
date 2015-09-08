'use strict';

var paths = {
  src: 'src',
  dist: 'dist'
};

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del', 'uglify-save-license']
});

gulp.task('build', function () {
  return gulp.src([paths.src + '/angular-style-bindings.js'])
      .pipe($.ngAnnotate())
      .pipe(gulp.dest(paths.dist))
      .pipe($.rename(function (path) {
        path.basename = path.basename.replace(/bindings/, 'bindings.min');
      }))
      .pipe($.sourcemaps.init())
      .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
      .pipe($.sourcemaps.write('.', {includeContent: true, sourceRoot: '/sources/js'}))
      .pipe(gulp.dest(paths.dist));
});

gulp.task('clean', function (done) {
  return $.del([paths.dist + '/'], done);
});

gulp.task('default', ['build']);