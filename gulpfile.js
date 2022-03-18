/*************************variables**************************************/
//Gulp
const gulp = require('gulp');
//HTML
const htmlmin = require('gulp-htmlmin');
//SASS
const sass = require('gulp-sass')(require('sass'));
//concat
const concat = require('gulp-concat');
//CSS
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

//Browser-sync
const browserSync = require('browser-sync').create();

/**************************tasks***************************************/
//HTML task
gulp.task('htmlmin', () => {
    return gulp
        .src('./dev/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./public'));
});

//SASS task
gulp.task('sass', () => {
    return gulp
        .src('./dev/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./dev/styles'))
        .pipe(browserSync.stream());
});

//CSS task
let cssPlugins = [
    cssnano(),
    autoprefixer()
]

gulp.task('css', () => {
    return gulp
        .src('./dev/styles/*.css')
        .pipe(concat('styles-min.css'))
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./public/styles'))
})


//Browser-sync
gulp.task('server', gulp.series('sass', function() {
    browserSync.init({
        server: './public'
    });

    gulp.watch('./public/styles/*.css'), gulp.series('css');
    gulp.watch('./public/*.html').on('change', browserSync.reload);
}));

//gulp.watch()
gulp.task('watch', () => {
    gulp.watch('./dev/*.html', gulp.series('htmlmin'));
    gulp.watch('./dev/scss/*.scss', gulp.series(sass));
    gulp.watch('./dev/styles/*.css', gulp.series('css'));
})


/*********************************End***************************************/