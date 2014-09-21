var mongoose = require('mongoose');
var Event = require('./models/event');
var User = require('./models/user');
var Comments = require('./models/comment');

mongoose.connect('mongodb://test:testes@ds033750.mongolab.com:33750/whereat');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  // console.log("Opened connection to Mongo!\n");
});

// Step 1
// new User({name: "Yamini"}).save;

// Step 2
// new Event({name: "partyyyyy", date: new Date("Oct 07, 2014"), where: "Peyton Pants"}).save();

// Step 3
// Event.find({ _id: "541e36898781d20b7058320e"}, function(err, a) {
//   a[0].hype("541e365e84ae90fe6fd48a61");
// });

// Step 4
User.find({ _id: "541e365e84ae90fe6fd48a61"}, function(err, yamini) {
  console.log(yamini[0]);
  yamini[0].attend("541e36898781d20b7058320e");
})

// Events.find({ _id: "541e1843bbd61e8d6c13f17a" }, function(err, party) {
  // party[0].upvote("541e179eb53263786c98cd3e");
// });

// User.find({ _id: "541e179eb53263786c98cd3e" }, function(err, yamini) {
//   yamini[0].commentOn(yamini[0].currentEvent, "This partay is banging", "");
// });
