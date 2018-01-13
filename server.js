// init project
var express = require('express');
var moment = require('moment');

var app = express();

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/:timestamp", function (req, res) {
  res.json(getTSResult(req));
});

function getTSResult(req) {
    var ts = req.params.timestamp;
    var time;
    
    if (!isNaN(ts)) {
      var unixtime = Number(ts);
      time = moment.unix(unixtime);
    } else {
      var timestamp = String(ts);
      time = moment(timestamp);
    }

    return {
      unix: time.unix(), 
      natural: time.format("MMMM DD, YYYY")
    };
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
