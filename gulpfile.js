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
        .src('./dev/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dev/styles'))
});

//CSS task
let cssPlugins = [
    cssnano(),
    autoprefixer()
]

gulp.task('css', () => {
    return gulp
        .src('./dev/styles/*.css')
        .pipe(postcss(cssPlugins))
        .pipe(gulp.dest('./public/styles'))
        .pipe(browserSync.stream());
})


//Browser-sync

gulp.task('server', gulp.series('sass', function() {
    browserSync.init({
        server: './public'
    });

    gulp.watch('./dev/scss/*.scss').on('change', browserSync.reload), gulp.series('sass');
    gulp.watch('./public/*.html').on('change', browserSync.reload);
}));



//gulp.watch()
gulp.task('watch', () => {
    gulp.watch('./dev/*.html', gulp.series('htmlmin'));
    gulp.watch('./dev/scss/main.scss', gulp.series('sass'));
    gulp.watch('./dev/styles/*.css', gulp.series('css'));
})


/*********************************End***************************************/