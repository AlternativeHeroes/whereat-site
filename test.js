var mongoose = require('mongoose');
var Event = require('./models/event');
var user = require('./models/user');
var comments = require('./models/comment');

var party = new Event({name: "partyyyyy", date: new Date("Oct 07, 2014")});
// console.log(Events);

Event.find({ _id: "541e1843bbd61e8d6c13f17a"}, function(err, party) {
  console.log(party[0]);
})
// var yam = new user({name: "Yamini"});

// var yamFound = user.find({ _id: yam._id });

// party.vote(yam, true);
// yam.attend(party._id);
// console.log(party.hype(yam._id));
//
// yam.commentOn(party._id, "This party is the bomb.com", "");
// console.log(party.comments[0].user.name + ": " + party.comments[0].text);


// console.log(party);
// console.log(yam);


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
