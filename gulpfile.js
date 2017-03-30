var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');


var files = {
    vendor: [],
    js: [
        './src/js/ui-lite.js',
        './src/js/**/*.js'
    ],
    sass: [
        './src/scss/ui-lite.scss'
    ]
};

gulp.task('watch', function () {
    gulp.watch([
        './src/scss/*.scss',
        './src/scss/**/*.scss',

        './src/js/*.js',
        './src/js/**/*.js',

        './demo/index.html'
    ], [
        'build'
    ]);
});

gulp.task('jshint', function () {
    gulp.src(files.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('js', function () {
    return gulp.src(files.js)
        .pipe(concat('ui-lite.js'))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass', function () {
    return gulp.src(files.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('ui-lite.css'))
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('build', function () {
    gulp.start('jshint');
    gulp.start('js');
    gulp.start('sass');
});

gulp.task('default', function () {
    gulp.start('build');
    gulp.start('watch');
});
