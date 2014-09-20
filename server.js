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

var party = new events({name: "partyyyyy", where: "TKE"});
// var party2 = new events({name: "party222222", where: "PIKE"});
var yam = new user({name: "Yamini"});

yam.attend(party);
console.log("upvote " + party.vote(yam, true));
console.log("downvote " + party.downvote(yam));

// yam.commentOn(party, "This party is the bomb.com", "");
// console.log(party.comments[0].user.name + ": " + party.comments[0].text);

// console.log('\n\n\n');

// party.save(function(err, e){
//   if (err) return console.error(err);
// });

// party2.save(function(err, e){
//   if (err) return console.error(err);
// });

// yam.save(function(err, e){
//   if (err) return console.error(err);
// });
