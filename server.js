// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/ZjVyKXp9hec

// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html

var players = [];

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

setInterval(heartbeat, 10);

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

    socket.on("start", function (data) {
      /*let player = new Player(
        socket.id,
        data.name,
        data.pos.x,
        data.pos.y,
        data.color
      );*/
      players.push(data);
      console.log(data);
    });

    socket.on("update", function (data) {
      for (var i = 0; i < players.length; i++) {
        if (socket.id == players[i].id) {
          players[i] = data;
        }
      }
    });

    socket.on("disconnect", function () {
      for (let i = 0; i < players.length; i++) {
        if (socket.id == players[i].id) {
          players.splice(i, 1);
        }
      }
      console.log("Client has disconnected");
    });
  }
);

/*class Player {
  constructor(id, name, _x, _y, color) {
    this.id = id;
    this.name = name;
    this.color = color;

    this.speed = 7;
    this.direction = 1;

    this.health = 100.0;
    this.armor = 0.0;

    this.currentAnimation = "idle";
    this.pos = { x: _x, y: _y };

    this.rigidBody;
    this.gun;
    this.UI;
  }

  setup() {}
  update() {}
  move() {}
  walk() {}
  show() {}
  keyPressed() {}
  jump() {}
  crouch() {}
  die() {}
  collidesPlatforms() {}
  playerToData() {}
}
*/
