var socket;
let globalData;
let game;
let gameReady;
let lobbyReady;
let gameisFull;
let gameStat;

function setup() {
  loadingText.style("display", "none");
  //theme_sound.setVolume(0.8);
  // theme_sound.loop();
  // Create a socket to local port 3000
  socket = io.connect();
  // Loop the game music
  // receive game stat
  socket.on("receiveGameState", function (stat) {
    gameStat = stat;
    console.log(gameStat);
  });
  // Create the game canvas
  var canvas = createCanvas(1600, 768);
  canvas.parent("sketchHolder");
  // Load the resources that game need
  loadResources();
  gameReady = false;
  lobbyReady = false;
  gameisFull = false;
  MainMenuUI();
  // Read other players datas
  socket.on("heartbeat", function (data, bullets) {
    globalData = data;
    if (lobbyReady || gameReady) {
      game.players = data;
      for (let i = 0; i < data.length; i++) {
        if (game.allAnimations[game.players[i].id] == undefined) {
          game.allAnimations[game.players[i].id] = resourceToAnimations(
            resources[game.players[i].color]
          );
        }
        game.players[i].__proto__ = Player.prototype;
      }
    }
  });

  socket.on("deleteAnim", function (id) {
    delete game.allAnimations[id];
  });

  socket.on("shoot", function (bullet) {
    if (bullet.id != socket.id) {
      bullet.__proto__ = Bullet.prototype;
      bullet.candamage = false;
      shot_sound.play(0.3);
      game.bullets.push(bullet);
    }
  });

  socket.on("getdamage", function (playerid, bulletid) {
    if (playerid == socket.id) {
      game.player.getDamage(bulletid);
    }
  });

  socket.on("popScore", function (id) {
    if (id == socket.id) game.player.getScore();
  });
}

function draw() {
  background(51);
  if (gameisFull) {
    gameFull();
    noLoop();
  } else if (lobbyReady) {
    if (game.players.length < maxPlayer) {
      lobby();
      game.player.id = socket.id;
    } else {
      gameReady = true;
      lobbyReady = false;
      game.timer = millis();
      socket.emit("gameStat", "started");
    }
  }

  if (gameReady) {
    game.draw();
    socket.emit("update", game.player);
    socket.emit("gameTime", game.currentTime);
  }
}

function mousePressed() {
  console.log(mouseX + " " + mouseY);
}
