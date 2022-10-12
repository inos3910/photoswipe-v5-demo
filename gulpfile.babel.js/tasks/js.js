import { globs, paths } from '../config';
import gulp from 'gulp';
import path from 'path';
import glob from 'glob';
import del from 'del'; //ファイル削除
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber'; //エラーでgulpが終了するのを止める
import notify from 'gulp-notify'; //デスクトップ通知
import gulpif from 'gulp-if';
import gulpEsbuild from 'gulp-esbuild';
import rename from 'gulp-rename';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from '../webpack.config';
import named from 'vinyl-named'; //webpackでファイル結合時に名前変更

const is_production = process.env.NODE_ENV === 'production';
const esbuildConfig = {
  entryPoints: glob.sync(globs.entry),
  bundle     : true,
  minify     : is_production,
  target     : ['es2019'],
  platform   :'node',
  sourcemap  : !is_production,
  outbase    : paths.jsSrcDir,
  outdir     : 'dist'
};

//出力済みファイルを削除
function deleteJsDistDir(done) {
  return del([paths.jsDistDir], done);
}
exports.deleteJsDistDir = deleteJsDistDir;

// dev build
function buildJs() {
  return gulp.src(globs.entry, {
    allowEmpty: true,
  })
  .pipe(plumber({
    errorHandler: notify.onError('<%= error.message %>'),
  }))
  .pipe(gulpEsbuild(esbuildConfig))
  .pipe(rename((renamePath) => {
    renamePath.basename = `${path.parse(renamePath.dirname).name}.bundle`;
    renamePath.dirname  = 'dist';
  }))
  .pipe(gulp.dest(paths.assetsDir))
  .pipe(notify('buildJs finished'))
  .pipe(browserSync.reload({
    stream: true
  }));
}
exports.buildJs = buildJs;

//prod build
function buildJsAll() {
  return gulp.src(globs.entry, {
    allowEmpty: true,
  })
  .pipe(plumber({
    errorHandler: notify.onError('<%= error.message %>'),
  }))
  .pipe(named((file) => {
    return file.relative ? path.parse(file.relative).dir : 'index';
  }))
  .pipe(webpackStream(webpackConfig, webpack))
  .pipe(gulp.dest(paths.jsDistDir))
  .pipe(notify('build:js-all finished'))
  .pipe(browserSync.reload({
    stream: true,
  }));
}
exports.buildJsAll = buildJsAll;
