var express = require("express");
var http = require("http");
var path = require("path");
var nodemailer = require("nodemailer");

var app = express();
var server = http.Server(app);
const port = process.env.PORT || 4000;
app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "")));

app.get("/", function (req, response) {
  response.sendFile(path.join(__dirname, ""));
});

app.post("/send_email", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var service = req.body.service;
  var date = req.body.date;
  var message = req.body.message;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "andiredhu@gmail.com",
      pass: "hmqt tqaz zfoe mdmg",
    },
  });

  var mailOptions = {
    from: '"admin"',
    to: "aadiredhu.business@gmail.com",
    subject: date + " " + name + " " + service,
    text: message + " " + email + " " + service,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email Send: " + info.response);
    }
    res.redirect("/booking.html");
  });
});

server.listen(port, function () {
  console.log("Starting server on port: " + port);
});
