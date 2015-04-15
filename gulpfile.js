'use strict';

var del = require('del');

var gulp = require('gulp-help')(require('gulp'));
var babel = require('gulp-babel');

// `gulp build`
// -----------------------------------------------------------------------------
gulp.task('build',
  'Compile everything.',
  ['scripts']
);

// `gulp scripts`
// -----------------------------------------------------------------------------
var scripts = {
  source: 'source/**/*.js',
  target: '.'
};

gulp.task('scripts',
  'Compile scripts to ES5.',
  ['scripts:clean'],
  function() {
    return gulp.src(scripts.source)
      .pipe(babel())
      .pipe(gulp.dest(scripts.target))
    ;
  }
);

gulp.task('scripts:clean', false, function(done) {
  del([
    scripts.target + '/index.{js,js.map}'
  ], done);
});

// `gulp clean`
// -----------------------------------------------------------------------------
gulp.task('clean',
  'Remove all built files.',
  ['scripts:clean']
);
