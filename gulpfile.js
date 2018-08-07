var gulp = require('gulp');
var sass = require('gulp-sass');
var browsersync = require('browser-sync').create();
// var browserify=require("gulp-browserify");
var uglify=require("gulp-uglify")
const babel = require('gulp-babel');

gulp.task('style', function() {
    gulp.src('./static/eos/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'})
    .on('error', sass.logError))
    .pipe(gulp.dest('./static/css'))
    .pipe(browsersync.stream());
});

gulp.task("eosjs",function(){
    gulp.src("./static/eos/js/*.js")
    // .pipe(browserify())
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest("./static/js"))
});

gulp.task('eoscss',function() {
    gulp.start('style');
    gulp.watch('./static/eos/sass/*.scss', ['style']);
});
gulp.task('default',['eoscss']);
gulp.task('default',['eosjs']);
