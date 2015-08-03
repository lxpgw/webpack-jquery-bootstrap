var webpack = require('webpack');
var path = require('path');

module.exports = {
  cache: true,
  entry: {
    jquery: './app/jquery',
    bootstrap: ['!bootstrap-webpack!./app/bootstrap/bootstrap.config.js', './app/bootstrap']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'dist/',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},

      //for bootstrap
      { test: /\.woff\d?$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
      { test: /\.ttf$/,    loader: "file-loader?name=fonts/[hash].[ext]&prefix=font/" },
      { test: /\.eot$/,    loader: "file-loader?name=fonts/[hash].[ext]&prefix=font/" },
      { test: /\.svg$/,    loader: "file-loader?name=fonts/[hash].[ext]&prefix=font/" },
    ]
  },
  resolve: {
    alias: {
      //jquery: 'jquery-2.0.3',
      //'jquery-ui': 'jquery-ui-1.10.3',
      //'jquery-ui-1.10.3$': 'jquery-ui-1.10.3/ui/jquery-ui.js'
    },
    moduleDirectories: ['web_modules', 'node_modules'],
  },
  plugins: [
    new webpack.ProvidePlugin({jQuery: 'jquery', $: 'jquery'}),

    //resolve for bower components
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
    )
  ]
};
