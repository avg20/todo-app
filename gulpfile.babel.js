import gulp from 'gulp';
import sass from 'gulp-sass';
import autoPrefixer from 'gulp-autoprefixer';
import rimraf from 'gulp-rimraf';
import ignore from 'gulp-ignore';
import source from 'vinyl-source-stream';
import browserify from 'browserify';
import babelify from 'babelify';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import runSequence from 'run-sequence';
import server from 'gulp-develop-server';
import rename from 'gulp-rename';

const paths = {
  srcJs: 'client/**/*.js',
  srcJsx: 'client/app.js',
  srcCss: 'client/source/scss/*',
  srcImages: 'client/source/images/**/*',
  
  dist: 'public/',
  distJs: 'public/js',
  distCss: 'public/css',
  distImages: 'public/images',
};

gulp.task('clean', () => {
  return gulp.src('./public/*', { read: false })
             .pipe(ignore('index.html'))
             .pipe(rimraf());
});

gulp.task('start', () => {
  server.listen({ path: './server.js' });
});

gulp.task('sass', () => {
  return gulp
    .src(paths.srcCss)
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(rename((path) => {
      const newPath = path;
      newPath.dirname = 'css';
      
      return newPath;
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('browserify', () => {
  const bundler = browserify({
    entries: [paths.srcJsx],
    transform: [babelify],
    debug: process.env.NODE_ENV !== 'production',
    cache: {}, packageCache: {}, fullPaths: true,
  });
  
  return bundler
    .bundle()
    .pipe(source(paths.srcJsx))
    .pipe(rename('app.js'))
    .pipe(gulp.dest(paths.distJs));
});

gulp.task('images', () => {
  return gulp.src(paths.srcImages)
             .pipe(imagemin({
               progressive: true,
               svgoPlugins: [
                 { removeViewBox: false },
                 { cleanupIDs: false },
               ],
               use: [pngquant()],
             }))
             .pipe(gulp.dest(paths.distImages));
});

gulp.task('watchTask', () => {
  gulp.watch(paths.srcCss, ['sass']);
  gulp.watch(paths.srcJs, ['browserify']);
  gulp.watch(paths.srcImages, ['images']);
});

gulp.task('watch', cb => {
  runSequence('clean', ['sass', 'browserify', 'images'], ['watchTask', 'start'], cb);
});

gulp.task('build', cb => {
  process.env.NODE_ENV = 'production';
  runSequence('clean', ['sass', 'browserify', 'images'], cb);
});
