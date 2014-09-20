var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.send('Hello World');
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
