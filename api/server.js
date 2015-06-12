var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 8080
  , router = express.Router()
  , mongoose = require('mongoose')
  , config = require('./config')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(config.db)

app.use('/api', require('./router'))

app.listen(port)
console.log('Magic happens on port ' + port)