var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  time: { type: Date, required: true, default: Date.now },
  where: { type: String, required: true,  },
  host: Object, // user id
  eventPicture: String, // picture url
  pictures: [String], // array of picture urls
  attendees: [], // array of user ids
  votes: { type: Number, default: 0 }, // number of up/downvotes
  hypeScore: { type: Number, default: 0 },
  comments: []
});

eventSchema.methods.vote = function (userId, good){
  if (userId.currentEvent != this._id) { // users can't vote until they attend
    console.warn(userId._id + " has not attended this event, they cannot rate it.");
    return userId._id + " has not attended this event, they cannot rate it."; // TODO CALL BACK WITH ERRORS AND STUFF
  }
  if (good) {
    userId.eventsLiked.push(this);
    this.votes++;
  } else {
    // TODO remove this event from user's eventsLiked array
    this.votes--;
  }
  return this.votes;
};

eventSchema.methods.upvote = function(userId){
  return this.vote(userId, true);
}

eventSchema.methods.downvote = function(userId){
  return this.vote(userId, false);
}

eventSchema.methods.hype = function (userId){
  hypeScore++;
  userId.eventsHyped.push(this);
  return hypeScore;
};

eventSchema.methods.addComment = function (commentId) {
  this.comments.push(commentId);
}

module.exports = mongoose.model('Event', eventSchema);
