const gulp = require('gulp')
const prettyError = require('gulp-prettyerror')
const htmlBeautify = require('gulp-html-beautify')
const imagemin = require('gulp-imagemin')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const cleanCSS = require('gulp-clean-css')
const cssImageDimensions = require('gulp-css-image-dimensions')
const path = require('path')

// ------ path
let paths = {
  scss: {
    watch: './scss/**/*.{scss, sass}',
    src: './scss/**/!(_)*.{scss,sass}',
    dest: './static/style/'
  },
  ico: {
    src: './dist/static/favicon.ico',
    dest: './dist/'
  },
  images: {
    src: './dist/static/images/',
    dest: './dist/static/images/'
  },
  html: {
    src: './dist/*.html',
    dest: './dist/'
  }
}

let buildIcon = () => {
  return gulp
    .src(paths.ico.src)
    .pipe(prettyError())
    .pipe(gulp.dest(paths.ico.dest))
}

let buildImage = () => {
  return gulp
    .src(paths.images.src)
    .pipe(prettyError())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest))
}

let buildHtml = () => {
  return gulp
    .src(paths.html.src)
    .pipe(prettyError())
    .pipe(htmlBeautify({
      indent_size: 2
    }))
    .pipe(gulp.dest(paths.html.dest))
}

let devStyles = () => {
  return gulp
    .src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 5 versions', '> 5%']
    }))
    .pipe(cssImageDimensions('../static/images/'))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest))
}

gulp.task('build:styles', devStyles)

gulp.task('watch:styles', () => {
  gulp.watch(paths.scss.watch, devStyles).on('change', (p) => {
    console.log(`${path.normalize(p)} on Changed!`)
  })
})

gulp.task('default', gulp.series(
  buildHtml,
  buildImage,
  buildIcon
))
