var mongoose = require('mongoose');
var events = require('./models/event');
var user = require('./models/user');
var comments = require('./models/comment');

var party = new events({name: "partyyyyy", date: new Date("Oct 07, 2014")});
var yam = new user({name: "Yamini"});

// party.vote(yam, true);
yam.attend(party);
console.log(party.hype(yam));

yam.commentOn(party, "This party is the bomb.com", "");
console.log(party.comments[0].user.name + ": " + party.comments[0].text);


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
