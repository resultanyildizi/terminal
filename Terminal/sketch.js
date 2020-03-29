let player;
let platforms = [];
let levelDesigner;

function setup() {
  createCanvas(1600, 768);
  loadResources();

  let res = resources["yellow"];

  player = new Player("Resul", res, 1400, 100);
  player.setup();

  levelDesigner = new LevelDesigner("res/levels/level2.txt");
  platforms = levelDesigner.platforms;
  console.log(platforms);
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
