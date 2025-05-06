// gulpfile.js
const { src, dest, watch, series, parallel } = require('gulp');
const sass        = require('gulp-sass')(require('sass'));
const concat      = require('gulp-concat');
const uglify      = require('gulp-uglify');
const cleanCSS    = require('gulp-clean-css');
const sourcemaps  = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// === adjust these to match your structure ===
const paths = {
  html: {
    src: 'src/index.html',
    dest: 'dist/'
  },
  styles: {
    src:  'src/sass/style.scss',
    watch:'src/sass/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src:  'src/javascript/**/*.js',
    dest: 'dist/js/'
  },
  images: {
    src:  'public/assets/images/**/*',
    dest: 'dist/assets/images/'
  }
};

// compile SCSS → CSS (with sourcemaps + minify)
function styles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: ['src/sass/partials'] })
      .on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// bundle & minify JS (with sourcemaps)
function scripts() {
  return src(paths.scripts.src, { sourcemaps: true })
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// copy HTML
function html() {
  return src(paths.html.src)
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// copy images
// function images() {
//   return src(paths.images.src)
//     .pipe(dest(paths.images.dest));
// }
 function images() {
    return src('public/assets/images/**/*')
      .pipe(dest('dist/assets/images/'));
  }

// serve & watch
function serve() {
  browserSync.init({
    server: { baseDir: 'dist' },
    port: 3000
  });

  watch(paths.styles.watch, styles);
  watch(paths.scripts.src, scripts);
  watch(paths.html.src, html);
  watch(paths.images.src, images).on('change', browserSync.reload);
}

// one-off build
const build = series(
  parallel(styles, scripts, html, images)
);

// default = build + serve + watch
exports.default = series(build, serve);
exports.build   = build;
