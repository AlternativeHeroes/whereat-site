var mongoose = require('mongoose');

function toLower (v) {
  return v.toLowerCase();
}
function validatePhone (v) {
  var targ=v.replace(/[^\d]/g,''); // remove all non-digits
  if(targ && targ.length===10) {
  // targ is a valid phone number
    return v;
  }
  return;
}
var organizationSchema = mongoose.Schema({
		name: { type: String, required: true },
    pastEvents Array,
    bio: String,
    facebook: String,
    twitter: String,
    email: { type: String, set: toLower },
    phoneNumber: {type: String, set: validatePhone, default: "9782061324" },
    picture:  String,
    currentEvent: ObjectID
	})

module.exports = mongoose.model("Organization", organizationSchema);
