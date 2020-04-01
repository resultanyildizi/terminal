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

function setup() {
  // Create a socket to local port 3000
  socket = io.connect("http://localhost:3000");

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
  player = new Player(
    IDjson.id,
    "Resul",
    yellowAnimations,
    1400,
    100,
    "yellow"
  );
  players.push(player);

  // Send the player data to the other clients
  socket.emit("start", player.playerToData());

  // Read other players datas
  socket.on("heartbeat", function(data) {
    playersData = data;

    if (players.length < playersData.length) {
      players.push(dataToPlayer(playersData[playersData.length - 1]));
    }

    for (let i = 0; i < players.length; i++) {
      if (playersData[i].id != player.id)
        players[i] = dataToPlayer(playersData[i]);
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
    if (players[i].id != player.id) {
      players[i].show();
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
