var socket;

let player;
let platforms = [];
let levelDesigner;

function setup() {

  socket = io.connect("http://localhost:3000");

  createCanvas(1600, 768);
  loadResources();

  let res = resources["yellow"];

  player = new Player("Resul", res, 1400, 100);
  player.setup();

  socket.emit("start", player);

  levelDesigner = new LevelDesigner("res/levels/level2.txt");
  platforms = levelDesigner.platforms;
}

function draw() {
  background(51);

  for (let i = 0; i < platforms.length; i++) {
    platforms[i].show();
  }

  player.update();
  player.show();
  // line(0, height / 2, width, height / 2);
}
