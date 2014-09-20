var mongoose = require('mongoose');

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
    phoneNumber: {type: String, set: validatePhone, default: "9782061324" },
    picture:  String,
    currentEvent: ObjectId
	})

module.exports = mongoose.model("User", userSchema);
