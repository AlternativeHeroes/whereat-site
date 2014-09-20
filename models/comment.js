var mongoose = require('mongoose');
var commentSchema = mongoose.Schema({
		username: { type: String, required: true },
    currentEvent: { type: String, required: true },
    description: String,
    picture:  String,
	})

module.exports = mongoose.model("Comment", commentSchema);
