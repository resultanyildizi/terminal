var socket;

let startButton;
let input;

let game;
let gameReady;

function setup() {
  // Create a socket to local port 3000
  socket = io.connect();
  // Create the game canvas
  createCanvas(1600, 768);
  // Load the resources that game need
  loadResources();

  createP("");
  startButton = createButton("Start");
  startButton.position(width / 2, height / 2 + 70);
  startButton.size(220, 50);
  input = createInput("Enter your name");
  input.position(width / 2, height / 2);
  input.size(220, 50);

  startButton.mousePressed(function () {
    if (trim(input.value()) != "" && trim(input.value()) != "Enter your name") {
      game = new Game(socket.id, input.value());
      game.setup();
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
  }
}
