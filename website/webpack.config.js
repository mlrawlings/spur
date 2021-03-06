var webpack = require('webpack')
  , path = require('path')

require('../environment')

module.exports = {
	entry: [
		__dirname+'/app.js'
	],
	output: {
		path: __dirname+'/dist',
		filename: 'app.js',
		publicPath: '/dist/'
	},
	module: {
		loaders:[{
			test: /\.jsx?$/,
			loader: "hash-loader"
		},{
			test: /\.jsx?$/,
			loader: "babel-loader",
			query: process.env.NODE_ENV == 'development' ? {
				plugins: ['react-transform'],
				extra: {
					'react-transform': {
						transforms: [{
							transform: 'react-transform-hmr',
							imports: ['react'],
							locals: ['module']
						}, {
							transform: 'react-transform-catch-errors',
							imports: ['react', 'redbox-react']
						}]
					}
				}
			} : {}
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
				NODE_ENV: '"'+process.env.NODE_ENV+'"',
				PROD_TYPE: '"'+process.env.PROD_TYPE+'"'
			}
		})
	],
	resolveLoader: {
		root:path.join(__dirname, '../node_modules')
	},
	externals: {
		react:'React',
	},
	devtool:'source-map'
}

if(process.env.NODE_ENV == 'development') {
	module.exports.entry.unshift('webpack-hot-middleware/client')
	module.exports.plugins.push(new webpack.HotModuleReplacementPlugin())
    module.exports.plugins.push(new webpack.NoErrorsPlugin())
}