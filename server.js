  // server.js
  // where your node app starts

  // init project
  var express = require("express");
  var moment = require("moment");
  var app = express();

  // enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
  // so that your API is remotely testable by FCC
  var cors = require("cors");
  const { urlencoded } = require("express");
  app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

  // http://expressjs.com/en/starter/static-files.html
  app.use(express.static("public"));

  // http://expressjs.com/en/starter/basic-routing.html
  app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
  });

  // your first API endpoint...
  app.get("/api", function (req, res) {
    res.json({
      unix: moment().valueOf(),
      utc: `${moment().format("ddd, DD MMM YYYY HH:mm:ss")}`,
    });
  });
  app.get("/api/hello", function (req, res) {
    res.json({ greeting: "hello API" });
  });

  app.get("/api/:date", function (req, res) {
    const { date } = req.params;

    const dateDecode = decodeURI(date);
    const newDate = new Date(dateDecode);
    if (moment(newDate, "YYYY-MM-DD", true).isValid()) {
      const unix = moment(newDate, "YYYY-MM-DD", true).valueOf();
      const utc = moment(newDate).format("ddd, DD MMM YYYY HH:mm:ss");

      res.json({ unix, utc: `${utc} GMT` });
    } else if (Number(date)) {
      res.json({
        unix: Number(date),
        utc: `${moment(Number(date)).format(
          "ddd, DD MMM YYYY HH:mm:ss"
        )} GMT`,
      });
    } else {
      res.json({ error: "Invalid Date" });
    }
  });

  // listen for requests :)
  var listener = app.listen(3000 || process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
  });
