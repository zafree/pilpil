var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    cssmin       = require('gulp-cssmin'),
    header       = require('gulp-header'),
    plumber      = require('gulp-plumber'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-ruby-sass'),
    uglify       = require('gulp-uglify'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

var pkg = require('./package.json');
var banner = ['/**',
              ' * Pilpil v<%= pkg.version %> - <%= pkg.description %>',
              ' * @link <%= pkg.homepage %>',
              ' * @copyright 2015-<%= new Date().getFullYear() %> <%= pkg.author %>',
              ' * @license <%= pkg.license %>',
                ' */',
                ''].join('\n');

var helpers = ['js/progressive-image-loading.js'];

// js
gulp.task('js', function(){
    gulp.src(helpers)
        .pipe(plumber())
        .pipe(concat(pkg.name+'.js'))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

// sass
gulp.task('sass', function(){
    return sass('sass/pilpil.scss')
          .pipe(plumber())
          .pipe(autoprefixer({
            browsers: ['Android >= 2.1',
                       'Chrome >= 21',
                       'Edge >= 12',
                       'Explorer >= 7',
                       'Firefox >= 17',
                       'Opera >= 12.1',
                       'Safari >= 6.0'],
            cascade: false}))
          .pipe(rename({basename: pkg.name}))
          .pipe(header(banner, { pkg : pkg } ))
          .pipe(gulp.dest('dist/css'))
          .pipe(cssmin())
      	  .pipe(rename({suffix: '.min'}))
          .pipe(header(banner, { pkg : pkg } ))
      	  .pipe(gulp.dest('dist/css'))
          .pipe(browserSync.stream());
});

// serve
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "."
        },
        notify: false
    });
});

// Watch
gulp.task('watch', function(){
    gulp.watch('js/*.js', ['js']);
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch("*.html").on("change", reload);
});

gulp.task('build', ['sass', 'js']);
gulp.task('default', ['sass', 'js', 'serve', 'watch']);
