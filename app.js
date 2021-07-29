//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstname = req.body.fName;
  var lastname = req.body.lName;
  var eid = req.body.email;

  var data = {
    members: [{
      email_address: eid,
      status: "subscribed",
      merge_field: {
        FNAME: firstname,
        LNAME: lastname
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/64e88fb660";

  const options = {
    method: "POST",
    auth: "suraj1:5417c6cd28e6e3109d522845f190443c-us6"
  }

  const request = https.request(url, options, function(response) {

    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });

  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(request,response){
  response.redirect("/");
});


app.listen(process.env.PORT, function() {
  console.log("Server detected at Port 3000");
});




// API Key
// 5417c6cd28e6e3109d522845f190443c-us6

// list
// 64e88fb660
