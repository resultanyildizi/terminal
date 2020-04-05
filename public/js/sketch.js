var socket;

let player;
let players = [];

let platforms = [];
let levelDesigner;

let allAnimations = {};

// ***************************************
// TODO : create an animation object for each player with their socket id's.
// Play that spesific animation when needed.
// ***************************************

function setup() {
  // Create a socket to local port 3000
  connecitonReady = false;
  socket = io.connect();
  // Create the game canvas
  createCanvas(1600, 768);

  // Load the resources that game need
  loadResources();

  // Create the level
  levelDesigner = new LevelDesigner("res/levels//level2.txt");
  platforms = levelDesigner.platforms;

  // Create the current player
  player = new Player(0, "Resul", 1400, 100, "yellow");
  player.setup();

  // Send the player data to the other clients
  socket.emit("start", player);

  // Set the player's id when connection is ready
  socket.on("connect", function () {
    player.id = socket.id;
  });

  // Read other players datas
  socket.on("heartbeat", function (data) {
    players = data;

    for (let i = 0; i < data.length; i++) {
      if (allAnimations[players[i].id] == undefined) {
        allAnimations[players[i].id] = resourceToAnimations(
          resources[players[i].color]
        );
      }
      players[i].__proto__ = Player.prototype;
    }
  });

  socket.on("deleteAnim", function (id) {
    delete allAnimations[id];
  });
}

function draw() {
  background(51);

  // Draw the platforms
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].show();
  }

  // Draw all other players except the current itself
  for (let i = 0; i < players.length; i++) {
    if (players[i].id !== socket.id) {
      players[i].show();
    }
  }

  // Update and draw the current player
  player.update();
  player.show();

  socket.emit("update", player);
}
