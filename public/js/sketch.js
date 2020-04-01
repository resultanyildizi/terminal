var socket;

let player;
let playersData = [];
let players = [];

let platforms = [];
let levelDesigner;

let yellowAnimations;
let redAnimations;
let blackAnimations;
let blueAnimations;

let connecitonReady;
function setup() {
  // Create a socket to local port 3000
  connecitonReady = false;
  socket = io.connect("http://localhost:5000");
  // Create the game canvas
  createCanvas(1600, 768);

  // Load the resources that game need
  loadResources();

  // Create the level
  levelDesigner = new LevelDesigner("res/levels//level2.txt");
  platforms = levelDesigner.platforms;

  // Create the animations which players need
  createAnimations();

  // Create the current player
  player = new Player(0, "Resul", yellowAnimations, 1400, 100, "yellow");
  players.push(player);

  // Send the player data to the other clients
  socket.emit("start", player.playerToData());

  socket.on("connect", function() {
    connecitonReady = true;
  });
  // Read other players datas
  socket.on("heartbeat", function(data) {
    playersData = data;

    if (players.length < playersData.length) {
      players.push(dataToPlayer(playersData[playersData.length - 1]));
    }

    for (let i = 0; i < players.length; i++) {
      if (connecitonReady == true) {
        if (playersData[i].id !== socket.id)
          players[i] = dataToPlayer(playersData[i]);
      }
    }
  });
}

function draw() {
  background(51);

  // Draw the platforms
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].show();
  }

  // Update and draw the current player
  player.update();
  player.show();

  // Draw all other players except the current itself
  for (let i = 0; i < players.length; i++) {
    if (connecitonReady) {
      if (players[i].id !== socket.id) {
        players[i].show();
      }
    }
  }

  // Send current player's updated datas to the other clients
  socket.emit("update", player.playerToData());
}

function createAnimations() {
  yellowAnimations = resourceToAnimations(resources["yellow"]);
  redAnimations = resourceToAnimations(resources["red"]);
  blackAnimations = resourceToAnimations(resources["black"]);
  blueAnimations = resourceToAnimations(resources["blue"]);
}
