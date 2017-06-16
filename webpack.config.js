const webpack = require('webpack');

module.exports = {
  entry: {
    bundle: __dirname + '/delivery/views/entry.js',
  },
  output: {
    path: __dirname + '/delivery/views/static/js',
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