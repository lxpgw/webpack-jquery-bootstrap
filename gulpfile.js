var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

//the development server
gulp.task('default',['webpack-dev-server']);

gulp.task('build-dev',['webpack:build-dev'], function() {
    gulp.watch(['app/**/*'], ['webpack:build-dev']);
});


//production build
gulp.task('build',['webpack:build']);


gulp.task('webpack:build', function(cb) {
  var Config = Object.create(webpackConfig);

  Config.plugins = Config.plugins.concat(
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringfy('production')
    //   }
    // }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  webpack(Config, function(err, stats){
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({colors: true}));
    cb();
  });
});

var devConfig = Object.create(webpackConfig);
devConfig.devtool = 'sourcemap';
devConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(devConfig);

gulp.task('webpack:build-dev', function(cb) {
    devCompiler.run(function(err, stats) {
      if (err) {
        throw new gutil.PluginError('[webpack:build-dev]', err);
      }
      gutil.log('[webpack:build-dev]', stats.toString({colors: true}));
      cb();
    });
});


gulp.task('webpack-dev-server', function(cb) {
    var Config = Object.create(webpackConfig);
    Config.devtool = 'eval';
    Config.debug = true;

    new WebpackDevServer(webpack(Config), {
      publicPath: '/' + Config.output.publicPath,
      stats: {
        colors: true
      }
    }).listen(8000, function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err);
      gutil.log("[webpack-dev-server]", "http://localhost:8000/webpack-dev-server/index.html");
    });
});
