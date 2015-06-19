var gulp     = require('gulp'),
    del      = require('del');

gulp.task('clean', function() {
    del(['dist'], cb);
});

gulp.task('files', function () {
    return gulp.src([
        'src/assets/img/**/*',
    ])
    .pipe(gulp.dest(
        'dist/assets/img'
    ));
});

gulp.task('render', function() {
    return gulp
            .src([
                'src/*.html',
            ])
            .pipe(usemin({
                css: [cssmin({ noAdvanced: 0, keepSpecialComments: 0 }), rev()],
                js : [uglify(), rev()]
            }))
            .pipe(gulp.dest('dist/'))
});

gulp.task('default', sequence('clean', ['render', 'files']));
