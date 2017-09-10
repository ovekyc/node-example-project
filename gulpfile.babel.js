//Include required modules
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import configify from 'config-browserify';
import envify from 'envify';
import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import gutil from 'gulp-util';
import changed from 'gulp-changed';
import jsonlint from 'gulp-jsonlint';
import nodemon from 'gulp-nodemon';
import rimraf from 'rimraf';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import unitest from 'unitest';

gulp.task('default', ['watch']);

gulp.task('build:static', ['clean:client'], () => {
  gulp.src('./src/client/static/**/*').pipe(gulp.dest('./dist-client/static'));
  gulp.src('./src/client/*.html').pipe(gulp.dest('./dist-client'));
});

gulp.task('build:client', ['clean:client'], () => compileClientJS(['./src/client/javascripts/bundle.js'], 'bundle.js', './dist-client/javascripts'));
gulp.task('build:server', ['clean:server'], () => compileNodeJS('src/{server,front}/**/*.js', './dist-server'));
gulp.task('build', ['build:client', 'build:server', 'build:static']);

gulp.task('build:test-server', ['clean:test'], () => compileNodeJS(['src/!(client)/!(browser)/**/*.js', 'src/!(client)/*.js'], './dist-test'));
gulp.task('build:test-json', ['clean:test'], () => gulp.src('src/**/*.json')
  .pipe(changed('src/**/*.json'))
  .pipe(gulp.dest('./dist-test/'))
);
gulp.task('build:test', ['build:test-server', 'build:test-json']);

gulp.task('clean:test', () => rimraf.sync('./dist-test'));
gulp.task('clean:client', () => rimraf.sync('./dist-client'));
gulp.task('clean:server', () => rimraf.sync('./dist-server'));
gulp.task('clean', ['clean:test', 'clean:server', 'clean:client']);

gulp.task('run:eslint', () => gulp.src(['src/**/*.js', '!src/test/browser/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.results(lintReporter))
  .pipe(eslint.failAfterError())
);

gulp.task('run:jsonlint', () => gulp.src(['**/*.json', '!node_modules/**'])
  .pipe(jsonlint())
  .pipe(jsonlint.reporter(lintReporter))
  .pipe(jsonlint.failAfterError())
);

gulp.task('run:test', ['build:test'], () => {
  const output = unitest({
    node: 'dist-test/test/node/index.js',
    report: ['text']
  }, (exitCode) => {
    if (exitCode !== 0) {
      console.error('Tests failed! - Test script exited with non-zero status code.');
    }
    return true;
  });
  output.pipe(process.stdout);
});

gulp.task('lint', ['run:eslint', 'run:jsonlint']);
gulp.task('test', ['lint', 'run:test']);

gulp.task('watch', ['build'], () => {
  nodemon({
    script: 'server.js',
    watch: 'src',
    tasks: ['build'],
    env: {'NODE_ENV': 'development'}
  })
});

gulp.task('server', ['build'], () => {
  nodemon({
    script: 'server.js',
    watch: false,
    env: {'NODE_ENV': 'production'}
  })
});


const compileClientJS = (entries, destName, destDir) =>
  browserify({
    entries: entries
  })
    .transform(babelify)
    .transform(configify)
    .transform(envify)
    .bundle()
    .pipe(source(destName))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(destDir));

const compileNodeJS = (src, dest) =>
  gulp.src(src)
    .pipe(changed(dest))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write({
      includeContent: false
    }))
    .pipe(gulp.dest(dest));

const lintReporter = (results) => {
  const logColor = results.errorCount ? gutil.colors.red : gutil.colors.green;
  gutil.log('Total Results: ' + results.length);
  gutil.log('Total Warnings: ' + results.warningCount);
  gutil.log(logColor('Total Errors: ' + results.errorCount));
};
