var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var MomentSchema = new Schema({
    title: String,
    time: Date,
    location: {
    	lat: Number,
    	lng: Number,
    	address: String,
    	name: String
    }
    // going: [Schema.Types.UserId],
 	// comments: [Schema.Types.CommentId]
})

module.exports = mongoose.model('Moment', MomentSchema)