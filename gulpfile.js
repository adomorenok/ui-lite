var gulp = require('gulp');
var install = require("gulp-install");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
//var jshint = require('gulp-jshint');


var files = {
    vendor: [],
    js: [
        './src/js/ui-lite.js',
        './src/js/components/*.js'
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
        './src/js/**/*.js'
    ], [
        'build'
    ]);
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
        /*.pipe(cssmin())
        .pipe(rename({suffix: '.min'}))*/
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('build', function () {
    gulp.start('js');
    gulp.start('sass');
});


gulp.task('default', function () {
    gulp.start('build');
    gulp.start('watch');
});
