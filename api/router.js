var express = require('express')
  , router = express()

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' })   
})

router = module.exports