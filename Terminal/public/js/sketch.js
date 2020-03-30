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
  socket = io.connect("http://localhost:3000");

  createCanvas(1600, 768);
  loadResources();

  yellowAnimations = resourceToAnimations(resources["yellow"]);
  redAnimations = resourceToAnimations(resources["red"]);
  blackAnimations = resourceToAnimations(resources["black"]);
  blueAnimations = resourceToAnimations(resources["blue"]);

  player = new Player(
    IDjson.id,
    "Resul",
    yellowAnimations,
    1400,
    100,
    "yellow"
  );
  players.push(player);

  IDjson.id += 1;
  save(IDjson, "res/levels/id.json");

  let data = {
    id: player.id,
    name: player.name,
    color: player.color,
    speed: player.speed,
    direction: player.direction,
    currentAnimation: player.currentAnimation,
    health: player.health,
    armor: player.armor,
    pos: player.pos,
    rigidBody: player.rigidBody,
    rbw: player.rbw,
    rbh: player.rbh,
    rby: player.rby
  };

  socket.emit("start", data);

  levelDesigner = new LevelDesigner("res/levels//level2.txt");
  platforms = levelDesigner.platforms;

  socket.on("heartbeat", function(data) {
    playersData = data;

    if (players.length < playersData.length) {
      players.push(dataToPlayer(playersData[playersData.length - 1]));
      // console.log("came");
    }

    for (let i = 0; i < players.length; i++) {
      if (playersData[i].id != player.id)
        players[i] = dataToPlayer(playersData[i]);
      // console.log(playersData[i].color);
    }

    // console.log(playersData.length + " -- " + players.length);
  });
}

function draw() {
  background(51);

  for (let i = 0; i < platforms.length; i++) {
    platforms[i].show();
  }

  player.update();
  player.show();

  // dataToPlayers();

  for (let i = 0; i < players.length; i++) {
    if (players[i].id != player.id) {
      // players[i].update();
      players[i].show();
    }
  }

  let data = {
    id: player.id,
    name: player.name,
    color: player.color,
    speed: player.speed,
    direction: player.direction,
    currentAnimation: player.currentAnimation,
    health: player.health,
    armor: player.armor,
    pos: player.pos,
    rigidBody: player.rigidBody,
    rbw: player.rbw,
    rbh: player.rbh,
    rby: player.rby
  };

  socket.emit("update", data);
}

function dataToPlayer(playerData) {
  let anims;

  if (playerData.color == "yellow") anims = yellowAnimations;
  else if (playerData.color == "red") anims = redAnimations;
  else if (playerData.color == "black") anims = blackAnimations;
  else if (playerData.color == "blue") anims = blueAnimations;
  else anims = redAnimations;

  let currPlayer = new Player(
    playerData.id,
    playerData.name,
    anims,
    playerData.pos.x,
    playerData.pos.y,
    playerData.color
  );

  currPlayer.currentAnimation = playerData.currentAnimation;
  currPlayer.direction = playerData.direction;

  return currPlayer;
}
