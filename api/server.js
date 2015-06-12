var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env.PORT || 8080
  , router = express.Router()
  , mongoose = require('mongoose')
  , Router = require('./router')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Require all files in routes
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' })   
})

app.use('/api', router)

app.listen(port)
console.log('Magic happens on port ' + port)