// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function (req, res) {
  console.log("No date");
  let utc = 'unix';
  let unix = 0;
  let data = {};
  let curr_time = Date.now();
    unix = curr_time;
    let curr_utc = new Date(unix);
    utc = curr_utc.toUTCString();

  data = {"unix": unix, "utc": utc};
  res.json(data);
});

app.get("/api/:date", function (req, res) {
  console.log(req.params);
  let date = req.params.date;
  let utc = 'unix';
  let unix = 0;
  let data = {};

  if (date.length >= 10){
    let userInput = new Date(date);

    if (userInput == "Invalid Date") {
      unix = parseInt(req.params.date);
      userInput = new Date(unix);
      if (userInput == 'Invalid Date')
      {
        return res.json({"error":"Invalid Date"});
      } else utc = userInput.toUTCString();
    } else {
      unix = userInput.valueOf();
      utc = userInput.toUTCString();
    }

  }
  else{
    let curr_time = Date.now();
    console.log("Currtime" + curr_time)
    unix = curr_time;
    let curr_utc = new Date(unix);
    utc = curr_utc.toUTCString();
  }
  data = {"unix": unix, "utc": utc};
  res.json(data);
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
