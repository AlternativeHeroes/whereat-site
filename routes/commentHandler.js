var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Comment = require('../models/comment');

mongoose.connect('mongodb://test:testes@ds033750.mongolab.com:33750/whereat');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  // console.log("Opened connection to Mongo!\n");
});

router.get('/:id', function(req, res) {
  Comment.find({ _id: req.param('id')}, function(err, cs) {
    if (cs.length != 1) {
      console.log("Broke search");
      return;
    }
    res.send(cs[0]);
  });
});

module.exports = router;
