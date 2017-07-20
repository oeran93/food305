const webpack = require('webpack');

module.exports = {
  entry: {
    '/user/views/static/js/bundle': __dirname + '/user/views/entry.js',
    '/admin/views/static/js/bundle': __dirname + '/admin/views/entry.js'
  },
  output: {
    path: './',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};
