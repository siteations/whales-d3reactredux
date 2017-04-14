'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './browser/react/index.js',
  output: {
    path: __dirname,
    filename: './browser/bundle.js'
  },
  context: __dirname,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
