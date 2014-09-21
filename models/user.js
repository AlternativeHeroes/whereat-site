var mongoose  = require('mongoose');
var Comment   = require('../models/comment');
var Event     = require('../models/event')

function toLower (v) {
  return v.toLowerCase();
}

// TODO: FIX THIS SHIT WITH A CALLBACK ON FAILURE
function validatePhone (v) {
  var targ=v.replace(/[^\d]/g,''); // remove all non-digits
  if(targ && targ.length===10) {
  // targ (target) is a valid phone number
    return v;
  }
  return;
}

var ObjectId = mongoose.Schema.Types.ObjectId;
var userSchema = mongoose.Schema({
		name: { type: String, required: true },
    bio: String,
    facebook: String,
    twitter: String,
    email: { type: String, set: toLower },
    phoneNumber: {type: String, set: validatePhone, default: "9782061324" }, // should this really be default?
    picture:  String,
    currentEvent: ObjectId,
    eventsLiked: [ObjectId],
    eventsHyped: [ObjectId]
});

userSchema.methods.attend = function(eventId) {
  var self = this;
  Event.find({ _id: eventId }, function(err, e) {
    if (e.length != 1) {
      return "something is wrong with your search";
    }
    e = e[0];
    if (!e.hasBegun()) {
      return "Sorry " + this.name + ", this event has not begun yet";
    }
    e.attendees.push(self._id);
    self.currentEvent = eventId;
    self.save();
  });
}

userSchema.methods.commentOn = function(eventId, ctext, picUrl) {
  var c = new Comment({ user: this._id, parent: eventId, text: ctext, picture: picUrl });
  c.save(function(err) {
    console.log("comment saved");
    Event.find({ _id: eventId }, function(err, e){
      if (e.length != 1) {
        return "something is wrong with your search";
      }
      console.log("comment pre-add");
      e[0].addComment(c._id);
      e[0].save();
    });
  });
}

module.exports = mongoose.model("User", userSchema);
