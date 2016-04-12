/**
 * gulpfile.js
 *
 */

'use strict';

var config = {
  port: 9006,
  devBaseUrl: 'http://localhost',
  paths: {
    html: 'src/*.html',
    images: 'src/images/*',
    sass: 'src/sass/**/*.scss',
    css: [
      'build/css/imports.css',
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
      'node_modules/font-awesome/css/font-awesome.min.css',
      'node_modules/toastr/build/toastr.min.css',
      'build/css/index.css'
    ],
    font: [
      'node_modules/bootstrap/fonts/*',
      'node_modules/font-awesome/fonts/*'
    ],
    js: 'src/**/*.js',
    mainJs: 'src/main.js',
    build: 'build'
  }
};

var gulp = require('gulp');

var connect = require('gulp-connect');
gulp.task('html', function () {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.build))
    .pipe(connect.reload());
});

gulp.task('images', function () {
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.build + '/images'));
})

var sass = require('gulp-sass');
gulp.task('sass', function () {
  gulp.src(config.paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.paths.build + '/css'))
    .pipe(connect.reload());
});

var concat = require('gulp-concat');
gulp.task('css', [
  'sass'
], function () {
  gulp.src(config.paths.css)
    .pipe(concat('index.min.css'))
    .pipe(gulp.dest(config.paths.build + '/css'))
    .pipe(connect.reload());
});

gulp.task('font', function () {
  gulp.src(config.paths.font)
    .pipe(gulp.dest(config.paths.build + '/fonts'));
});

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
gulp.task('js', function () {
  browserify(config.paths.mainJs)
    .transform(babelify, {
      presets: [
        'react',
        'es2015',
        'stage-0'
      ]
    })
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('index.js'))
    .pipe(gulp.dest(config.paths.build + '/js'))
    .pipe(connect.reload());
});

gulp.task('connect', function () {
  connect.server({
    root: [
      config.paths.build
    ],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

var open = require('gulp-open');
gulp.task('open', [
  'connect'
], function () {
  gulp.src(config.paths.build + '/index.html')
    .pipe(open({
      uri: config.devBaseUrl + ':' + config.port + '/'
    }));
});

var rsync = require('gulp-rsync');
gulp.task('deploy', function () {
  gulp.src(config.paths.build + '/**')
    .pipe(rsync({
      root: config.paths.build,
      hostname: 'imcv.org.au',
      port: 18765,
      username: 'imcv1',
      destination: '~/public_html/goluki',
      progress: true
    }))
    .on('error', console.error.bind(console));
});

gulp.task('watch', function () {
  gulp.watch(config.paths.html, [
    'html'
  ]);
  gulp.watch(config.paths.sass, [
    'css'
  ]);
  gulp.watch(config.paths.js, [
    'js'
  ]);
});

gulp.task('default', [
  'html',
  'images',
  'css',
  'font',
  'js',
  'open',
  'watch'
]);
