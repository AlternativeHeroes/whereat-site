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
  var self = this;
  require('../models/user').find({ _id: userId }, function(err, user){
    console.log(good);
    if (user.length != 1) { console.log("Something is wrong with your search"); }
    user = user[0];
    if (user.currentEvent != self._id) { // users can't vote until they attend
      // console.warn(userId._id + " has not attended this event, they cannot rate it.");
      console.log(user._id + " has not attended this event, they cannot rate it."); // TODO CALL BACK WITH ERRORS AND STUFF
      return;
    }
    if (self.voters.indexOf(userId) != -1) {
      console.log(user._id + "has already voted, please stop.");
      return;
    }
    if(!self.hasBegun()){
    	console.log("Cannot vote, this event has not yet started.");
      return;
    }
    if (good) {
      user.eventsLiked.push(self);
      self.votes++;
      console.log('VOTES ' + self.votes);
    } else {
      // TODO remove this event from user's eventsLiked array
      self.votes--;
    }
    self.voters.push(userId);
    self.save();
  });
};

eventSchema.methods.upvote = function(userId){
  return this.vote(userId, true);
}

eventSchema.methods.downvote = function(userId){
  return this.vote(userId, false);
}

eventSchema.methods.hype = function(userId){
  var self = this;
  require('../models/user').find({ _id: userId }, function(err, user){
    if (user.length != 1) {
      console.log("something went wrong with search");
      return;
    }
    user = user[0];
    if(self.hasBegun()) {
    	console.log("Cannot hype, this event has already begun.");
      return;
    }
    if (user.eventsHyped.indexOf(self._id) != -1) {
      console.log(user._id + "has already hyped, please stop.");
      return;
    }
    self.hypeScore++;
    user.eventsHyped.push(self._id);
    user.save();
    self.save();
  });
};

eventSchema.methods.addAttendee = function(userId){
  this.attendees.push(userId);
  console.log("Hi " + this.attendees);
  this.save();
}

eventSchema.methods.addComment = function (commentId) {
  this.comments.push(commentId);
  this.save();
};

eventSchema.methods.hasBegun = function () {
  return Date.now() > this.date.getTime();
};

module.exports = mongoose.model('Event', eventSchema);
