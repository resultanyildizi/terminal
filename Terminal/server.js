var express = require("express");

var app = express();
var server = app.listen(8080);

app.use(express.static("public"));

console.log("My app is running");
