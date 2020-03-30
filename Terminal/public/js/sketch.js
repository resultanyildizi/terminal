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
    socket.id,
    "Resul",
    yellowAnimations,
    1400,
    100,
    "yellow"
  );

  let data = {
    id: player.id,
    name: player.name,
    color: player.color,
    speed: player.speed,
    direction: player.direction,
    health: player.health,
    armor: player.armor,
    pos: player.pos,
    rigidBody: player.rigidBody,
    rbw: player.rbw,
    rbh: player.rbh,
    rby: player.rby
  };

  console.log(data);

  socket.emit("start", data);

  levelDesigner = new LevelDesigner("res/levels/level2.txt");
  platforms = levelDesigner.platforms;

  socket.on("heartbeat", function(data) {
    // console.log(data.length);
    playersData = data;
  });
}

function draw() {
  background(51);

  for (let i = 0; i < platforms.length; i++) {
    platforms[i].show();
  }

  player.update();
  player.show();

  dataToPlayers();

  for (let i = 0; i < players.length; i++) {
    players[i].update();
    players[i].show();
  }

  let data = {
    id: player.id,
    name: player.name,
    color: player.color,
    speed: player.speed,
    direction: player.direction,
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

function dataToPlayers() {
  for (let i = 0; i < playersData.length; i++) {
    if (playersData[i].id != player.id) {
      let anims;
      if (playersData[i].color == "yellow") anims = yellowAnimations;
      else if (playersData[i].color == "red") anims = redAnimations;
      else if (playersData[i].color == "black") anims = blackAnimations;
      else if (playersData[i].color == "blue") anims = blueAnimations;

      let currPlayer = new Player(
        playersData[i].id,
        playersData[i].name,
        anims,
        playersData[i].pos.x,
        playerData[i].pos.y,
        playerData[i].color
      );

      players.push(currPlayer);
    }
  }
}
