import gulp from 'gulp';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import stylelint from "stylelint";
import reporter from "postcss-reporter";
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import eslint from "gulp-eslint";
import sync from 'browser-sync';
import autoprefixer from 'autoprefixer';
import conventionalChangelog from 'gulp-conventional-changelog';

gulp.task('server', () => {
  return sync({
    server: {
      baseDir: './'
    },
    open: 'external',
    port: 9000
  });
});

gulp.task('reload', () => {
  return sync.reload();
});

gulp.task('css', () => {
  return gulp.src('./src/cssnext/*.css')
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: err => {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(postcss([
      autoprefixer(),
      require('postcss-nested'),
      require('postcss-simple-vars'),
      require('postcss-calc'),
      stylelint(),
      reporter({ clearMessages: true }),
      require('cssnano'),
      require("postcss-cssnext")(),
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('babel', ["lint"], () => {
  return gulp.src('./src/js/*.es6')
    .pipe(plumber({
      errorHandler: err => {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('./dist/js/'))
});

gulp.task("lint", () => {
  return gulp.src("./src/js/*.es6")
    .pipe(eslint({useEslintrc : true}))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('changelog', () => {
  return gulp.src('CHANGELOG.md')
    .pipe(conventionalChangelog({
      preset: 'angular'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('w', ['build', 'server'], () => {
  gulp.watch('./src/cssnext/*.css', ['css']);
  gulp.watch('./src/js/*.es6', ['babel']);
  gulp.watch('./*.html', ['reload']);
  gulp.watch('./dist/**/**.css', ['reload']);
  return gulp.watch('./dist/**/*.js', ['reload']);
});

gulp.task('build', ['css']);

gulp.task('default', ['build']);
