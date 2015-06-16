var thinky = require('thinky')()
  , type = thinky.type

var Moment = thinky.createModel('Moment', {
    title: String,
    datetime: Date,
    location: {
        lat: Number,
        lng: Number,
        address: String,
        name: String
    }
    // going: [Schema.Types.UserId],
    // comments: [Schema.Types.CommentId]
})

module.exports = Moment