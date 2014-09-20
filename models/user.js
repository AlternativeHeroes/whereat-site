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
    currentEvent: Object,
    eventsLiked: [],
    eventsHyped: []
});

userSchema.methods.attend = function(e) {
  if (!e.hasBegun()) {
    return "Sorry " + this.name + ", this event has not begun yet";
  }
  e.attendees.push(this);
  this.currentEvent = e;
}

userSchema.methods.commentOn = function(event1, ctext, picUrl) {
  var c = new comment({ user: this, parent: event1, text: ctext, picture: picUrl });
  event1.addComment(c);
}

module.exports = mongoose.model("User", userSchema);
