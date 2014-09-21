var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var eventSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  where: { type: String, required: true },
  host: [ObjectId], // user id
  eventPicture: String, // picture url
  pictures: [String], // array of picture urls
  attendees: [ObjectId], // array of user ids
  votes: { type: Number, default: 0 }, // number of up/downvotes
  voters: [ObjectId], // user id of voters
  comments: [ObjectId], // id of comments
  hypeScore: { type: Number, default: 0 }
});

eventSchema.methods.vote = function (userId, good){
  User.find({ _id: userId }, function(err, user){
    if (user.currentEvent != this._id) { // users can't vote until they attend
      // console.warn(userId._id + " has not attended this event, they cannot rate it.");
      return user._id + " has not attended this event, they cannot rate it."; // TODO CALL BACK WITH ERRORS AND STUFF
    }
    if (this.voters.indexOf(userId) != -1) {
      return user._id + "has already voted, please stop.";
    }
    if(!this.hasBegun()){
    	return  "Cannot vote, this event has not yet started.";
    }
    if (good) {
      user.eventsLiked.push(this);
      this.votes++;
    } else {
      // TODO remove this event from user's eventsLiked array
      this.votes--;
    }
    this.voters.push(userId);
    return this.votes;
  });
};

eventSchema.methods.upvote = function(userId){
  return this.vote(userId, true);
}

eventSchema.methods.downvote = function(userId){
  return this.vote(userId, false);
}

eventSchema.methods.hype = function(userId){
  if(this.hasBegun())
  	return  "Cannot hype, this event has already begun.";
  this.hypeScore++;
  user.eventsHyped.push(this);
  return this.hypeScore;
};

eventSchema.methods.addComment = function (commentId) {
  this.comments.push(commentId);
}

eventSchema.methods.hasBegun = function () {
  return Date.now() > this.date.getTime();
}

module.exports = mongoose.model('Event', eventSchema);
