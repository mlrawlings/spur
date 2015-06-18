var express = require('express')
  , app = module.exports = express()
  , nunjucks = require('nunjucks')
  , webpackDevMiddleware = require("webpack-dev-middleware")
  , webpack = require("webpack")
  , compiler = webpack(require('./webpack.config.js'))
  , session = require('../common/session')

nunjucks.configure(__dirname+'/views', {
    autoescape: true,
    express: app
})

app.use(express.static(__dirname+'/public'))

app.use(webpackDevMiddleware(compiler))

app.use(session)

app.use(require('./router'))

if(require.main === module) {
	app.listen(7787)
}
