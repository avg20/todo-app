import gulp from 'gulp';

/*import sass from 'gulp-sass';
 import autoPrefixer from 'gulp-autoprefixer';
 import cleanCSS from 'gulp-clean-css';
 import rimraf from 'gulp-rimraf';
 import ignore from 'gulp-ignore';

 import source from 'vinyl-source-stream';
 import browserify from 'browserify';
 import watchify from 'watchify';
 import babelify from'babelify';

 import imagemin from 'gulp-imagemin';
 import pngquant from 'imagemin-pngquant';*/

import runSequence from 'run-sequence';
import nodemon from 'gulp-nodemon';

/*import rename from 'gulp-rename';
 import print from 'gulp-print';*/

const paths = {
  srcJs    : 'client/**/*.js',
  srcJsx   : 'client/app.js',
  srcCss   : 'client/**/*.scss',
  srcImages: 'client/images/*',

  dist      : 'public/dist',
  distJs    : 'public/dist/js',
  distCss   : 'public/dist/css',
  distImages: 'public/dist/images'
};

/*gulp.task( 'clean', function () {
 return gulp.src( './public/dist/*', { read: false } )
 .pipe( ignore( 'semantic' ) )
 .pipe( rimraf() );
 } );*/

gulp.task( 'start', function () {
  nodemon( {
    script: 'server.js',
    ignore: [
      'test/',
      'node_modules/'
    ],
    ext   : 'js html css',
    env   : { 'NODE_ENV': 'development' }
  } )
} );
/*
 gulp.task( 'sass', function () {
 return gulp
 .src( paths.srcCss )
 .pipe( sass() )
 .pipe( autoPrefixer() )
 .pipe( cleanCSS( { compatibility: 'ie8' } ) )
 .pipe( rename( function ( path ) {
 path.dirname = "css";
 } ) )
 .pipe( gulp.dest( paths.dist ) );
 } );

 gulp.task( 'browserify', function () {
 var bundler = browserify( {
 entries  : [ paths.srcJsx ],
 transform: [ babelify ],
 debug    : process.env.NODE_ENV != 'production',
 cache    : {}, packageCache: {}, fullPaths: true
 } );

 return bundler
 .bundle()
 .pipe( source( paths.srcJsx ) )
 .pipe( rename( "app.js" ) )
 .pipe( gulp.dest( paths.distJs ) );
 } );

 gulp.task( 'images', function () {
 return gulp.src( paths.srcImages )
 .pipe( imagemin( {
 progressive: true,
 svgoPlugins: [
 { removeViewBox: false },
 { cleanupIDs: false }
 ],
 use        : [ pngquant() ]
 } ) )
 .pipe( gulp.dest( paths.distImages ) );
 } );

 gulp.task( 'watchTask', () => {
 gulp.watch( paths.srcCss, [ 'sass' ] );
 gulp.watch( paths.srcJs, [ 'browserify' ] );
 gulp.watch( paths.srcImages, [ 'images' ] );
 } );*/

gulp.task( 'watch', cb => {
  //runSequence( 'clean', [ 'sass', 'browserify', 'images' ], [ 'watchTask', 'start' ], cb );
  runSequence( 'start', cb );
} );

/*gulp.task( 'build', cb => {
 process.env.NODE_ENV = 'production';
 runSequence( 'clean', [ 'sass', 'browserify', 'images' ], cb );
 } );*/
