var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  name: String,
  description: String,
  time: Date,
  where: String,
  host: ObjectId, // user id
  pictures: Array, // array of picture urls
  attendees: Array, // array of user ids
  ratings: Array // array of ...?
});

module.exports = mongoose.model('Event', eventSchema);;
