var mongoose = require('mongoose');

function toLower (v) {
  return v.toLowerCase();
}

var userSchema = mongoose.Schema({
		name: { type: String, required: true },
    bio: String,
    facebook: String,
    twitter: String,
    email: { type: String, set: toLower },
    picture:  String,
    currentEvent: String,
	})

module.exports = mongoose.model("User", userSchema);
