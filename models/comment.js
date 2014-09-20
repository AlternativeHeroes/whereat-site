var mongoose = require('mongoose');
var commentSchema = mongoose.Schema({
		user: { type: Object, required: true },
    // parent: { type: Object, required: true },
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
