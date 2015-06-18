var express = require('express')
  , app = express()

app.use(require('./api/server'))
app.use(require('./website/server'))

app.listen(7787)