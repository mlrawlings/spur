var webpack = require('webpack')
  , path = require('path')

module.exports = {
	entry: __dirname+'/client.js',
	output: {
		path: __dirname+'/dist',
		filename: 'client.js',
		publicPath: '/client.js'
	},
	module: {
		loaders:[{
			test: /\.jsx?$/,
			loaders: ["hash-loader", "babel-loader"]
		},{
			test: /\.json$/,
			loader: "json-loader"
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			__BROWSER__:true,
			__SERVER__:false,
			'process.env': {
				NODE_ENV: process.env.NODE_ENV || '"development"'
			}
		})
	],
	resolveLoader: {
		root:path.join(__dirname, '../node_modules')
	},
	externals: {
		react:'React',
		'react/addons':'React'
	},
	devtool:'inline-source-map'
}