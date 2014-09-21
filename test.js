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
// new User({name: "A-aron"}).save();

// Step 2
// new Event({name: "Cheese Party", date: new Date("Sept 23, 2014"), where: "Flagg Building"}).save();


// Step 3
// Event.find({ _id: "541e36898781d20b7058320e"}, function(err, a) {
//   a[0].hype("541e365e84ae90fe6fd48a61");
// });

// Step 4
// User.find({ _id: "541e365e84ae90fe6fd48a61"}, function(err, yamini) {
//   console.log(yamini[0]);
//   yamini[0].attend("541e36898781d20b7058320e");
// })

// Step 5
// Event.find({ _id: "541e36898781d20b7058320e" }, function(err, party) {
//   party[0].downvote("541e365e84ae90fe6fd48a61");
// });

// Step 6
// User.find({ _id: "541e365e84ae90fe6fd48a61" }, function(err, yamini) {
//   yamini[0].commentOn(yamini[0].currentEvent, "This partay is banging, still", "");
// });


//
// THIS IS A SUPER GOOD WAY TO PASS OBJECTS probably..
//
// var mongoose = require('mongoose');
// var a = mongoose.model("A", {name: String});
// var b = mongoose.model("B", {name: String, parent: Object});
//
// var aa = new a({name: "I am aa"});
// var bb = new b({name: "I am bb", parent: aa});
//
// console.log();
// console.log(aa + '\n');
// console.log(bb + '\n');
// console.log(bb.parent + '\n');

// var mongoose = require('mongoose');
// var a = mongoose.model("A", {name: String});
// var b = mongoose.model("B", {name: String, parent: []});
//
// var aa = new a({name: "I am aa"});
// var bb = new b({name: "I am bb", parent: aa});
//
// console.log();
// console.log(aa + '\n');
// console.log(bb + '\n');
// console.log(bb.parent + '\n');
