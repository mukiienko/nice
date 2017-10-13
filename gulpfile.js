'use strict';

// Utilities
var     gulp = require('gulp'),
        sass = require('gulp-sass'),
        rename = require('gulp-rename'),
        autoprefixer = require('gulp-autoprefixer');

var scssIncludes = [
    './node_modules/font-awesome/scss'
];

var autoprefixerOptions = {
    browsers: [
        'last 2 versions',
        'ie >= 10',
        '> 5%'
    ]
};

gulp.task('icons', function(){
    return gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./dist/fonts'))
});
gulp.task('fonts', function(){
    return gulp.src('./src/fonts/**/*.{eot,svg,ttf,otf,woff}')
        .pipe(gulp.dest('./dist/fonts'));
});
gulp.task('compile', function(){
    return gulp.src('./src/**/*.scss')
        .pipe(sass({
            includePaths: scssIncludes
        }).on('error', sass.logError))
        .pipe(rename('nice.css'))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('./dist'));
});
gulp.task('compile-min', function(){
    return gulp.src('./src/**/*.scss')
        .pipe(sass({
            includePaths: scssIncludes,
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename('nice.min.css'))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('./dist'));
});
gulp.task('docs', function(){
    return gulp.src('./docs/**/*.scss')
        .pipe(sass({
            includePaths: scssIncludes,
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename('docs.min.css'))
        .pipe(gulp.dest('./docs'));
});
gulp.task('default', ['icons', 'fonts', 'compile', 'compile-min']);

gulp.task('watch', function(){
    gulp.watch('./src/**/*.scss', ['default']);
});
gulp.task('watch-docs', function(){
    gulp.watch('./docs/**/*.scss', ['docs']);
});