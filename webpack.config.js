var webpack = require('webpack')
var path = require('path')

var BUILD_DIR = path.resolve(__dirname, 'app/frontend/static/js')

module.exports = {
  entry: {
    indexPage: __dirname + '/app/entry_points/indexPage.js',
    myMealsPage: __dirname + '/app/entry_points/myMealsPage.js'
  },
  output: {
    path: BUILD_DIR,
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
}
