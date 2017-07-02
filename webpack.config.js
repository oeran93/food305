const webpack = require('webpack');

module.exports = {
  entry: {
    '/delivery/views/static/js/bundle': __dirname + '/delivery/views/entry.js',
    '/delivery_admin/views/static/js/bundle': __dirname + '/delivery_admin/views/entry.js'
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
      }
    ]
  }
};
