var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

// tarea por defecto
gulp.task('default', ['compile-sass'], function () {
    // arrancar el servidor de browserSync
    browserSync.init({
        server: './'
    });
    // cuando haya cambios en los archivos .scss, compila sass
    gulp.watch('./assets/scss/*.scss', ['compile-sass']);

    // cuando cambie el html, recarga el navegador
    gulp.watch('./*.html', browserSync.reload);
});

// compila archivos sass
gulp.task('compile-sass', function () {
    gulp.src('./assets/scss/main.scss')               // cargo main.scss
        .pipe(sass().on('error', function (error) {
            return notify().write(error);
        }))      // compilo sass
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream()) // recargar el CSS en el navegador
        .pipe(notify('SASS compilado!'));               // dejo el archivo en dist
});