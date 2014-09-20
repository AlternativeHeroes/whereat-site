var mongoose = require('mongoose');
var events = require('./models/event');
var user = require('./models/user');
var comments = require('./models/comment');

mongoose.connect('mongodb://test:testes@ds033750.mongolab.com:33750/whereat');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Opened connection to Mongo!\n");
});

var yamini = new user({ name: "GoonYamini" });
var nick = new user({ name: "GoonNick" });
var michael = new user({ name: "GoonMike" });

var ptke = new events({ name: "TKE party", date: Date.now() + 24 * 3600, where: "Peyton pants" });
// var ptke1 = new events({ name: "TKE party11", date: new Date("23 Sept 2014"), where: "Peter" });
// var ptke2 = new events({ name: "TKE party222", date: Date.now(), where: "Chandrew" });

console.log(yamini.attend(ptke));
// console.log(yamini.attend(ptke1));
// console.log(yamini.attend(ptke2));
//
// console.log(nick.attend(ptke));
// console.log(nick.attend(ptke1));
// console.log(nick.attend(ptke2));
//
// console.log(michael.attend(ptke));
// console.log(michael.attend(ptke1));
// console.log(michael.attend(ptke2));


// var cc = new comments({ user: yamini, text: "This partay was banging" });
// console.log(cc);
// // cc.save();
// ptke.comments.push(cc);

yamini.commentOn(ptke, "This partay was banging", "");

yamini.save();
// nick.save();
// michael.save();

ptke.save();
