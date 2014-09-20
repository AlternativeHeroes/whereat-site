var http    = require('http');
var mongojs = require('mongojs');

var uri = "mongodb://test:testes@ds033750.mongolab.com:33750/whereat";
var db = mongojs.connect(uri, ['testCollection']);

var server = http.createServer(requestHandler);

function requestHandler(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  db.testCollection.find({"color": "red"}, function(err, records) {
    if (err) {
      console.log("There was an error with your query.");
      console.log(err);
      res.end();
      return;
    }

    var html = "<h2>Vehicles with a red finish</h2>";
    var i = records.length;

    while(i--) {
      html += '<p><b>Name:</b> '
            + records[i].name
            + '<br /><b>Number of wheels:</b> '
            + records[i].wheels
            + '<br /><b>Color:</b> '
            + records[i].color;
    }
    res.write(html);
    res.end();
  });
}

server.listen(8888);

console.log("Server started and listening to port 8888");
