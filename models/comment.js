var mongoose = require('mongoose');
var Event = require('../models/event');

var ObjectId = mongoose.Schema.Types.ObjectId;
var commentSchema = mongoose.Schema({
		userId: { type: ObjectId, required: true },
    parent: { type: ObjectId, required: true },
		date: { type: Date, default: Date.now },
    text: String,
    picture:  String,
		votes: { type: Number, default: 0 } // number of up/downvotes
});

commentSchema.methods.vote = function (userId, good){
	if (good) {
		this.votes++;
	} else {
		this.votes--;
	}
	return this.votes;
};

commentSchema.methods.upvote = function(userId){
	return this.vote(userId, true);
}

commentSchema.methods.downvote = function(userId){
	return this.vote(userId, false);
}

module.exports = mongoose.model("Comment", commentSchema);
