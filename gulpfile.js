var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var cssmin = require("gulp-cssmin");
var header = require("gulp-header");
var plumber = require("gulp-plumber");
var rename = require("gulp-rename");
var sass = require("gulp-sass")(require("sass")); // Updated import
var uglify = require("gulp-uglify");
var browserSync = require("browser-sync").create(); // Updated import

var pkg = require("./package.json");
var banner = `/**
 * Pilpil v${pkg.version} - ${pkg.description}
 * @link ${pkg.homepage}
 * @copyright 2015-${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */`;

var helpers = ["js/progressive-image-loading.js"];

// js
gulp.task("js", function () {
  return gulp
    .src(helpers)
    .pipe(plumber())
    .pipe(concat(pkg.name + ".js"))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest("dist/js"))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

// sass
gulp.task("sass", function () {
  return (
    gulp
      // .src("sass/pilpil.scss")
      .src("sass/image.sass")
      .pipe(plumber())
      .pipe(sass().on("error", sass.logError)) // Updated sass function call
      .pipe(
        autoprefixer({
          overrideBrowserslist: [
            "Android >= 2.1",
            "Chrome >= 21",
            "Edge >= 12",
            "Explorer >= 7",
            "Firefox >= 17",
            "Opera >= 12.1",
            "Safari >= 6.0",
          ],
          cascade: false,
        })
      )
      .pipe(rename({ basename: pkg.name }))
      .pipe(header(banner, { pkg: pkg }))
      .pipe(gulp.dest("dist/css"))
      .pipe(cssmin())
      .pipe(rename({ suffix: ".min" }))
      .pipe(header(banner, { pkg: pkg }))
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.stream())
  );
});

// serve
gulp.task("serve", function () {
  browserSync.init({
    server: {
      baseDir: ".",
    },
    notify: false,
  });
});

// Watch
gulp.task("watch", function () {
  gulp.watch("js/*.js", gulp.series("js")); // Updated task syntax
  gulp.watch("sass/**/*.scss", gulp.series("sass")); // Updated task syntax
  gulp.watch("*.html").on("change", browserSync.reload); // Updated syntax
});

gulp.task("build", gulp.parallel("sass", "js")); // Updated task syntax
gulp.task("default", gulp.series("sass", "js", "serve", "watch")); // Updated task syntax
