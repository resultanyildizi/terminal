var socket;

let startButton;
let input;

let game;
let gameReady;

function setup() {
  // Create a socket to local port 3000
  socket = io.connect();
  // Create the game canvas
  var canvas = createCanvas(1600, 768);
  canvas.parent("sketchHolder");
  // Load the resources that game need
  loadResources();

  MainMenuUI();

  // Read other players datas
  socket.on("heartbeat", function (data) {
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
    }
  });

  socket.on("deleteAnim", function (id) {
    delete allAnimations[id];
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
