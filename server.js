// Load the http module to create an http server.
var http = require('http');
// Load mongoose for database stuff
var mongoose = require('mongoose');

// Models TODO: remove later? delegate?
var Event = require('./models/event');
var User = require('./models/user');
var Comments = require('./models/comment');

// connect to database
mongoose.connect('mongodb://test:testes@ds033750.mongolab.com:33750/whereat');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  // console.log("Opened connection to Mongo!\n");
});

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (req, res) {
  console.log(req.method);
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Hello World\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
