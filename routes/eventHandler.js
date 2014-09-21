var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Event = require('../models/event');
var User = require('../models/user');

mongoose.connect('mongodb://test:testes@ds033750.mongolab.com:33750/whereat');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  // console.log("Opened connection to Mongo!\n");
});

router.post('/new', function(req, res) {
  var e = new Event(req.body);
  e.save(function(err) {
    res.send(this._id);
  })
});

router.get('/list/', function(req, res) {
  Event.find({}, function(err, events) {
    var futureEvents = [];
    events.forEach(function(e) {
      if (e.isRelevant()){
        futureEvents.push(e);
      }
    });
    res.send(futureEvents);
  })
});

router.get('/list/all', function(req, res) {
  Event.find({}, function(err, events) {
    var allEvents = [];
    events.forEach(function(e) {
      allEvents.push(e);
    });
    res.send(allEvents);
  })
});

router.get('/list/past', function(req, res) {
  Event.find({}, function(err, events) {
    var pastEvents = [];
    events.forEach(function(e) {
      if (!e.isRelevant()){
        pastEvents.push(e);
      }
    });
    res.send(pastEvents);
  })
});

router.get('/:id', function(req, res) {
  Event.find({ _id: req.param('id')}, function(err, events) {
    if (events.length != 1) {
      console.log("Broke search");
      return;
    }
    res.send(events[0]);
  })
});

router.like('/:id', function(req, res) {
  Event.find({ _id: req.param('id')}, function(err, events) {
    if (events.length != 1) {
      console.log("Broke search");
      return;
    }
    res.send(events[0]);
  })
});

router.like('/:id/:userId', function(req, res) {
  Event.find({ _id: req.param('id')}, function(err, events) {
    if (events.length != 1) {
      console.log("Broke search");
      return;
    }
    var e = events[0];
    e.upvote(req.param('userId'));
    res.send(e.votes);
  })
});

router.dislike('/:id/:userId', function(req, res) {
  Event.find({ _id: req.param('id')}, function(err, events) {
    if (events.length != 1) {
      console.log("Broke search");
      return;
    }
    var e = events[0];
    e.downvote(req.param('userId'));
    res.send(e.votes);
  })
});

router.post('/:id/:userId/text/:content', function(req, res) {
  var userId = req.param('userId');
  var id = req.param('id');
  var content = req.param('content');
  User.find({ _id: userId}, function(err, user) {
    if (user.length != 1) {
      console.log("Broke search");
      return;
    }
    user = user[0];
    user.commentOn(id, content, "");
  })
});

router.post('/:id/:userId/picture/:content', function(req, res) {
  var userId = req.param('userId');
  var id = req.param('id');
  var content = req.param('content');
  User.find({ _id: userId}, function(err, user) {
    if (user.length != 1) {
      console.log("Broke search");
      return;
    }
    user = user[0];
    user.commentOn(id, "", content);
  })
});

module.exports = router;
