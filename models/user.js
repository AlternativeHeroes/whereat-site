var mongoose = require('mongoose');
var comment = require('../models/comment');

function toLower (v) {
  return v.toLowerCase();
}

// TODO: FIX THIS SHIT WITH A CALLBACK ON FAILURE
function validatePhone (v) {
  var targ=v.replace(/[^\d]/g,''); // remove all non-digits
  if(targ && targ.length===10) {
  // targ is a valid phone number
    return v;
  }
  return;
}
var userSchema = mongoose.Schema({
		name: { type: String, required: true },
    bio: String,
    facebook: String,
    twitter: String,
    email: { type: String, set: toLower },
    phoneNumber: {type: String, set: validatePhone, default: "9782061324" }, // should this really be default?
    picture:  String,
    currentEvent: mongoose.Schema.Types.ObjectId,
    eventsLiked: [mongoose.Schema.Types.ObjectId],
    eventsHyped: [mongoose.Schema.Types.ObjectId]
});

userSchema.methods.attend = function(eventId) {
  eventId.attendees.push(this);
  this.currentEvent = eventId;
}

userSchema.methods.commentOn = function(eventId, ctext, picUrl) {
  var c = new comment({ user: this, parent: eventId, text: ctext, picture: picUrl });
  console.log(c);
  eventId.addComment(c);
}

module.exports = mongoose.model("User", userSchema);
