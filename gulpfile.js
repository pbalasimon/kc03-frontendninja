var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var fontAwesome = require('node-font-awesome');

// config bootstrap
var bootstrapConfig = {
    entryPoint: "./node_modules/bootstrap/scss/"
}

// config font-awesome
var faConfig = {
    fonts: fontAwesome.fonts,
    entryPoint: fontAwesome.scssPath,
    dest: './dist/fonts'
}

// config sass
var sassConfig = {
    taskName: 'compile-sass',
    watchFiles: './src/scss/*.scss',
    entryPoint: './src/scss/main.scss',
    dest: './dist/css'
};

var jsConfig = {
    taskName: 'concat-js',
    watchFiles: './src/js/*.js',
    entryPoint: './src/js/main.js',
    concatFile: 'main.js',
    dest: './dist/js'
};

// tarea por defecto
gulp.task('default', [sassConfig.taskName, jsConfig.taskName], function () {
    // arrancar el servidor de browserSync
    browserSync.init({
        server: './'
    });
    // cuando haya cambios en los archivos .scss, compila sass
    gulp.watch(sassConfig.watchFiles, [sassConfig.taskName]);

    // cuando haya cambios en los archivos js, los concatena
    gulp.watch(jsConfig.watchFiles, [jsConfig.taskName]);

    // cuando cambie el html, recarga el navegador
    gulp.watch('./*.html', browserSync.reload);
});

gulp.task('compile-fa', function () {
    gulp.src(faConfig.fonts)
        .pipe(gulp.dest(faConfig.dest));
});

// compila archivos sass
gulp.task(sassConfig.taskName, ['compile-fa'], function () {
    gulp.src(sassConfig.entryPoint)               // cargo main.scss
        .pipe(sass({
            includePaths: [bootstrapConfig.entryPoint, faConfig.entryPoint]
        }).on('error', function (error) {
            return notify().write(error);
        }))      // compilo sass
        .pipe(gulp.dest(sassConfig.dest))
        .pipe(browserSync.stream()) // recargar el CSS en el navegador
        .pipe(notify('SASS compilado!'));               // dejo el archivo en dist
});

gulp.task(jsConfig.taskName, function () {
    gulp.src(jsConfig.entryPoint)
        .pipe(tap(function (file) {
            // lo pasamos por browserify para importar los require
            file.contents = browserify(file.path).bundle()
        }))
        .pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
        // .pipe(concat(jsConfig.concatFile))
        .pipe(gulp.dest(jsConfig.dest))
        .pipe(notify('JS concatenado'))
        .pipe(browserSync.stream());
})