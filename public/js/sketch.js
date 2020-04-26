var socket;

let startButton;
let input;

let game;
let gameReady;
let timeOut;
function setup() {
  frameRate(120);
  // Create a socket to local port 3000
  socket = io.connect();
  // Create the game canvas
  var canvas = createCanvas(1600, 768);
  canvas.parent("sketchHolder");
  // Load the resources that game need
  loadResources();

  MainMenuUI();

  timeOut = 5.0;

  // Read other players datas
  socket.on("heartbeat", function (data, bullets) {
    if (gameReady) {
      game.players = data;

      for (let i = 0; i < data.length; i++) {
        if (game.allAnimations[game.players[i].id] == undefined) {
          game.allAnimations[game.players[i].id] = resourceToAnimations(
            resources[game.players[i].color]
          );
        }
        game.players[i].__proto__ = Player.prototype;
      }

      timeOut -= 1;
    }
  });

  socket.on("deleteAnim", function (id) {
    delete game.allAnimations[id];
  });

  socket.on("shoot", function (bullet) {
    bullet.__proto__ = Bullet.prototype;

    if (bullet.id != socket.id) game.bullets.push(bullet);
  });

  socket.on("getdamage", function (id) {
    if (id == socket.id && timeOut <= 0) {
      game.player.getDamage(game.players.length);
      timeOut = 5.0;
    }
  });
}

function draw() {
  background(51);

  if (gameReady) {
    game.player.id = socket.id;
    game.draw();
    socket.emit("update", game.player);
  }
}
