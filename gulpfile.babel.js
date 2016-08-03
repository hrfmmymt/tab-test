import gulp from 'gulp';
import postcss from 'gulp-postcss';
import cssnext from 'gulp-cssnext';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import sync from 'browser-sync';
import autoprefixer from 'autoprefixer';

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
    .pipe( sourcemaps.init())
    .pipe(postcss([
      autoprefixer(),
      require('postcss-mixins'),
      require('postcss-nested'),
      require('postcss-simple-vars'),
      require('cssnano')
    ]))
    .pipe(cssnext([
      require('cssnext'),
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('babel', () => {
  return gulp.src('./src/js/*.es6')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('./dist/js/'))
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
