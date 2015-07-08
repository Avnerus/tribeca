'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var gls = require('gulp-live-server');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var autoprefixer = require ('gulp-autoprefixer');
var browserify = require('browserify');
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var file = require('gulp-file');
var del = require('del');
var uglifyfy = require('uglifyify')
var rename = require('gulp-rename');

var server;
var watchEvent;
var environment = 'development';

// DEVELOPMENT TASKS
//================================================

/*
* 1. Setup a webserver with livereload using BrowserSync
* 2. JS and CSS get processed and served from the 'build' folder
* */

// ENV
gulp.task('env', function() {
  process.env.APP_BASE_PATH = __dirname;
});


gulp.task('css', function() {
    // Extract the CSS from the JS Files and place into a single style with autoprefixer
    return gulp.src('src/app/components/**/*.js')
    .pipe(replace(/(^[\s\S]*<style>|<\/style>[\s\S]*$)/gm, ''))
    .pipe(concat('style.css'))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(gulp.dest('build/app'));
});


gulp.task('public',['public-css','public-lib','public-assets','browserify'], function() {
    return gulp.src('build/client/bundle.js')
    .pipe(gulp.dest('public/build/client'));
});

gulp.task('public-css', ['css'], function() {
    return gulp.src('build/app/**/*.css')
    .pipe(gulp.dest('public/build/app'));
});

gulp.task('public-lib', function() {
    return gulp.src('lib/**/*.js')
    .pipe(gulp.dest('public/lib'));
});
gulp.task('public-assets', function() {
    return gulp.src('assets/**/*.*')
    .pipe(gulp.dest('public/assets'));
});

// JS
gulp.task('browserify', ['js-client', 'js-server', 'js-app', 'js-environment'], function() {
    // Browserify
    var b = browserify({
        entries: './build/client/index.js',
        debug: true,
        transform: [babelify.configure({optional: ['runtime', 'es7.asyncFunctions']})]
    });
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest('build/client'));

});

gulp.task('js-server', function() {
    return gulp.src('src/server/**/*.js')
      .pipe(gulp.dest('build/server'));
});

gulp.task('js-client', function() {
    return gulp.src('src/client/**/*.js')
      .pipe(gulp.dest('build/client'));
});

gulp.task('js-app', function() {
    return gulp.src('src/app/**/*.js')
      // remove the styles (they were extracted)
      .pipe(replace(/<style>[\s\S]*<\/style>/gm, ''))
      .pipe(gulp.dest('build/app'));
})

// HTML
gulp.task('html', function() {
  gulp.src(['./index.html'])
    .pipe(gulp.dest('./build'));
});

// serve task
gulp.task('serve', ['html', 'public', 'env'] , function(cb) {
  server = gls.new('app.js');
  server.start();


  gulp.watch(['./src/**/*.js'], function(event) {
      watchEvent = event;
      gulp.start('reload-server');
  });
  gulp.watch('app.js', server.start);
});

gulp.task('reload-server', ['public'], function() {
    console.log("Reloading server!")
    server.notify(watchEvent) ;
});

gulp.task('delete-build', function (cb) {
    return del([
        'build/**/*',
    ], function() {
        cb();
    });
});
  
gulp.task('js-environment',['delete-build', 'js-env-client', 'js-env-server'], function() {
    return gulp.src('src/app/environments/' + environment + '.js')
        .pipe(rename('environment.js'))
        .pipe(gulp.dest('build/app/'));
})
gulp.task('js-env-client', function() {
    return;
})

gulp.task('js-env-server', ['delete-build'], function() {
    return gulp.src('src/server/environments/' + environment + '.js')
        .pipe(rename('environment.js'))
        .pipe(gulp.dest('build/server/'));
})

// Task for generating the primus client
gulp.task('primus', function() {
    var Primus = require('primus');
    var Emitter = require('primus-emitter');
    var primus = Primus.createServer(function connection(spark) {

    }, { port: 3000, transformer: 'websockets'  });    
    primus.use('emitter', Emitter);
    var str = primus.library();
    return file('primus.js', str, { src: true  }).pipe(gulp.dest('lib'));
})

// Default
gulp.task('default', ['serve']);



// DISTRIBUTION TASKS (TODO)
//===============================================
// Delete dist Directory
gulp.task('delete-dist', function (cb) {
    del([
        'dist/**/*',
    ], cb);
});

gulp.task('set-env-dist', function(cb) {
    environment = 'production';
    console.log("-==Environment: " + environment + "==-");
    cb();
})

gulp.task('browserify-dist', ['js-client', 'js-app','js-environment', 'public-dist'], function() {
    // Browserif-app
    //
    var b = browserify({
        entries: './build/client/index.js',
        transform: [babelify.configure({optional: ['runtime', 'es7.asyncFunctions']}), 'uglifyify']
    });

    function bundle() {
        return b.bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(gulp.dest('dist/public/build/client'));
    }
    return bundle();

});
gulp.task('public-bundle-dist', ['browserify-dist'], function() {
    return gulp.src('build/client/bundle.js')
        .pipe(gulp.dest('public/build/client'));
});

gulp.task('public-dist',['public-css', 'public-assets', 'public-lib'], function() {
    return gulp.src('public/**/*')
    .pipe(gulp.dest('dist/public'));
});
gulp.task('build-dist',['html','js-server','public-dist'], function() {
    return gulp.src('build/**/*')
    .pipe(gulp.dest('dist/build'));
})
gulp.task('package-json-dist',function() {
    return gulp.src('package.json')
    .pipe(gulp.dest('dist/'));
})
gulp.task('root-dist', ['public-dist','package-json-dist'], function() {
    return gulp.src('app.js')
    .pipe(gulp.dest('dist/'));
})
gulp.task('selfies-dist',function() {
    return gulp.src('selfies/**/*')
    .pipe(gulp.dest('dist/selfies'));
})

gulp.task('dist', ['delete-dist','set-env-dist', 'build-dist', 'selfies-dist', 'root-dist', 'public-bundle-dist'], function() {
})
