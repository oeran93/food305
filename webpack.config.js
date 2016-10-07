var webpack = require('webpack')
var path    = require('path')

var BUILD_DIR = path.resolve(__dirname, 'app/frontend/static/js')

module.exports = {
	entry: {
		home: __dirname + '/app/entry.js',
	},
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
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
