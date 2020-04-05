var socket;

let player;
let players = [];

let platforms = [];
let levelDesigner;

let pname;
let pcolor;
let allAnimations = {};

let startButton;
let input;
let gameReady;

function setup() {
  // Create a socket to local port 3000
  socket = io.connect();
  // Create the game canvas
  createCanvas(1600, 768);

  // Load the resources that game need
  loadResources();

  // Create the level
  levelDesigner = new LevelDesigner("res/levels//level2.txt");
  platforms = levelDesigner.platforms;

  createP("");
  startButton = createButton("Start");
  startButton.position(width / 2, height / 2 + 70);
  startButton.size(220, 50);
  input = createInput("Enter your name");
  input.position(width / 2, height / 2);
  input.size(220, 50);

  startButton.mousePressed(function () {
    if (trim(input.value()) != "" && trim(input.value()) != "Enter your name") {
      // Create the current player
      player = new Player(0, input.value(), 1400, 100, "black");
      player.setup();
      // Send the player data to the other clients
      socket.emit("start", player);
      gameReady = true;

      startButton.hide();
      input.hide();
    }
  });

  input.mousePressed(function () {
    input.value("");
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

  if (gameReady) {
    player.id = socket.id;
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
}
