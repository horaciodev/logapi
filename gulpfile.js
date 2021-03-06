var gulp = require('gulp'),
  nodemon= require('gulp-nodemon'),
  gulpMocha = require('gulp-mocha'),
  env = require('gulp-env'),
  superTest = require('supertest');


  gulp.task('default', function(){
    nodemon({
      script: 'app.js',
      ext: 'js',
      env: {
        PORT: 9001
      },
      ignore: ['./node_modules/**']
    })
    .on('restart', function(){
      console.log('Restarting..');
    });
  });

  gulp.task('test', function(){
    env({vars:{ENV:'Test'}});
    gulp.src('tests/*.js',{ read: false })
      .pipe(gulpMocha({reported: 'nyan'}));
  });
