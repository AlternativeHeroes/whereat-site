var mongoose = require('mongoose');

function toLower (v) {
  return v.toLowerCase();
}

var userSchema = mongoose.Schema({
		name: { type: String, required: true },
    bio: { type: String, required: true },
    facebook: type: String, 
    twitter: type: String,
    email: { type: String, required: true, set: toLower },
    picture:  type: String,
    currentEvent: type: String,
	})

modules.exports = mongoose.model("User", userSchema);