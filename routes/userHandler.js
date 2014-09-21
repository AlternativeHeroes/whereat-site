var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/user');

mongoose.connect('mongodb://test:testes@ds033750.mongolab.com:33750/whereat');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  // console.log("Opened connection to Mongo!\n");
});

router.post('/new/:name', function(req, res) {
  new User({ name: req.param('name') }).save(function(err) {
    res.send(this._id);
  });
});

module.exports = router;
