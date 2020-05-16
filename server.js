// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ZjVyKXp9hec

// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html

var players = [];
var bullets = [];

var gameStat = "unknown";

// Using express: http://expressjs.com/
var express = require("express");
var delay = require("express-delay");
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://" + host + ":" + port);
}

app.use(express.static("public"));
// WebSocket Portion
// WebSockets work with the HTTP server
var io = require("socket.io")(server);

setInterval(heartbeat, 33);

function heartbeat() {
  io.sockets.emit("heartbeat", players);
}

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on(
  "connection",
  // We are given a websocket object in our function
  function (socket) {
    console.log("We have a new client: " + socket.id);

    io.sockets.emit("receiveGameState", gameStat);

    if (players.length <= 0) gameStat = "unknown";

    socket.on("start", function (data) {
      data.id = socket.id;
      players.push(data);
    });

    socket.on("update", function (data) {
      for (var i = 0; i < players.length; i++) {
        if (socket.id == players[i].id) {
          players[i] = data;
        }
      }
    });

    socket.on("bulletUpdate", function (data) {
      bullets = data;
    });

    socket.on("disconnect", function () {
      for (let i = 0; i < players.length; i++) {
        if (socket.id == players[i].id) {
          players.splice(i, 1);
        }
      }
      io.sockets.emit("deleteAnim", socket.id);
      if (players.length <= 0) gameStat = "unknown";
      console.log("Client has disconnected");
    });

    socket.on("shoot", function (bullet) {
      io.sockets.emit("shoot", bullet);
    });

    socket.on("givedamage", function (playerid, bulletid) {
      io.sockets.emit("getdamage", playerid, bulletid);
    });

    socket.on("gameStat", function (stat) {
      gameStat = stat;
    });

    socket.on("pushScore", function (id) {
      io.sockets.emit("popScore", id);
    });
  }
);
