var express = require('express')
  , app = express()
  , nunjucks = require('nunjucks')

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.use(express.static('public'))

app.use(require('./router'))

app.listen(8080)