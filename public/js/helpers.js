let spawnPoints = [
  { x: 190, y: 350 },
  { x: 190, y: 90 },
  { x: 1410, y: 350 },
  { x: 14140, y: 90 },
  { x: 1510, y: 550 },
  { x: 90, y: 550 },
  { x: 800, y: 350 },
  { x: 800, y: 120 },
];

let _index = 0;

class Heal {
  constructor() {
    _index++;
    let randomPoint = spawnPoints[_index % 8];
    this.x = randomPoint.x;
    this.y = randomPoint.y;
    this.amount = 20.0;
    this.r = 30;
    this.isGone = false;
  }

  draw() {
    push();
    stroke(255);
    fill("LIGHTGREEN");
    textAlign(CENTER, CENTER);
    textSize(70);
    text("+", this.x, this.y);
    pop();
  }

  heal() {
    let players = game.players;

    for (let i = 0; i < players.length; i++) {
      let current = players[i];
      this.collidesPlayer(current);
    }
  }

  collidesPlayer(current) {
    let playerRight = current.pos.x + current.rigidBody.w / 2;
    let playerLeft = current.pos.x - current.rigidBody.w / 2;
    let playerTop = current.pos.y - current.rigidBody.h / 2;
    let playerBottom = current.pos.y + current.rigidBody.h / 2;
    // Check collision
    if (
      this.x + 10 >= playerLeft &&
      this.x - 10 <= playerRight &&
      this.y + 10 >= playerTop &&
      this.y - 10 <= playerBottom
    ) {
      if (current.id == game.player.id) game.player.heal(this.amount);
      this.isGone = true;
      heal_sound.setVolume(0.6);
      heal_sound.play();
    }
  }
}
