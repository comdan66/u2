var gulp = require ('gulp'),
    notify = require('gulp-notify'),
    uglifyJS = require ('gulp-uglify'),
    livereload = require('gulp-livereload'),
    minifyHTML = require('gulp-minify-html'),
    del = require('del');

gulp.task ('default', function () {
  livereload.listen ();

  ['./root/*.html', './root/css/**/*.css', './root/res/**/*.js', './root/*.php', './root/js/**/*.js'].forEach (function (t) {
    gulp.watch (t).on ('change', function () {
      gulp.run ('reload');
    });
  });
});

gulp.task ('reload', function () {
  livereload.changed ();
  console.info ('\nReLoad Browser!\n');
});

gulp.task ('minify', function () {
  gulp.run ('js-uglify');
  gulp.run ('res-uglify');
  gulp.run ('minify-html');
});
gulp.task ('gh-pages', function () {
  del (['./root']);
});
gulp.task ('js-uglify', function () {
  gulp.src ('./root/js/*.js')
      .pipe (uglifyJS ())
      .pipe (gulp.dest ('./root/js/'));
});
gulp.task ('res-uglify', function () {
  gulp.src ('./root/res/**/*.js')
      .pipe (uglifyJS ())
      .pipe (gulp.dest ('./root/res/'));
});
gulp.task ('minify-html', function () {
  var opts = {comments: true, spare:true};

  gulp.src ('./root/index.html')
      .pipe (minifyHTML (opts))
      .pipe (gulp.dest ('./root/'))
});