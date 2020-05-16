let bulletDamage = 10;
class Bullet {
  constructor(id, x, y, dir) {
    this.id = id;
    this.speed = 50;
    this.dir = dir;
    this.start_x = x;
    this.start_y = y;
    this.pos_x = x;
    this.pos_y = y;
    this.done = false;
    this.muzzle = 0;
    this.candamage = true;
    this.scalar = random(1.5, 2.0);
    shot_sound.setVolume(0.6);
    shot_sound.play();
  }

  move() {
    this.pos_x += this.dir * this.speed;
  }

  draw() {
    push();
    noStroke();
    let col = color(255, 246, 196, 200);
    fill("#fff6c4");
    rect(this.pos_x, this.pos_y, 4, 2);
    col = color(255, 246, 196, 120);
    fill(col);
    rect(this.pos_x - 4 * this.dir, this.pos_y, 20, 2);
    col = color(255, 246, 196, 80);
    fill(col);
    rect(this.pos_x - 20 * this.dir, this.pos_y, 20, 2);
    pop();

    let muzzlex;
    let muzzley;
    // draw muzzle flash

    let im;
    if (this.dir == 1) {
      im = muzzleFlashR;
      muzzlex = this.start_x + 32 * this.dir;
      muzzley = this.start_y - 7.5;
    } else {
      im = muzzleFlashL;
      muzzlex = this.start_x + 47 * this.dir;
      muzzley = this.start_y - 7.5;
    }

    if (this.muzzle <= 2) {
      this.muzzle += 1;
      image(
        im,
        muzzlex,
        muzzley,
        im.width * this.scalar,
        im.height * this.scalar
      );
    }
  }
  collidesPlayer() {
    let players = game.players;
    for (let i = 0; i < players.length; i++) {
      let current = players[i];
      let currentBottom = current.pos.y + current.rigidBody.h / 2;
      let currentTop = current.pos.y - current.rigidBody.h / 2;
      let currentRight = current.pos.x + current.rigidBody.w / 2;
      let currentLeft = current.pos.x - current.rigidBody.w / 2;

      if (this.dir == -1 && this.start_x >= currentRight) {
        if (
          this.pos_x <= currentRight &&
          this.pos_y <= currentBottom &&
          this.pos_y >= currentTop &&
          this.id != current.id &&
          !current.isDead
        ) {
          this.done = true;
          blood_flesh_sound.play(0.2);

          if (this.candamage) socket.emit("givedamage", current.id, this.id);
        }
      } else if (this.dir == 1 && this.start_x <= currentLeft) {
        if (
          this.pos_x >= currentLeft &&
          this.pos_y <= currentBottom &&
          this.pos_y >= currentTop &&
          this.id != current.id &&
          !current.isDead
        ) {
          this.done = true;
          blood_flesh_sound.play(0.2);

          if (current.health <= 10 && this.candamage) {
            game.player.getScore();
          }
          if (this.candamage) socket.emit("givedamage", current.id);
        }
      }
    }
  }

  update() {
    this.move();
    this.collidesPlayer();
  }

  isOut() {
    return this.pos_x < 0 || this.pos_x > width || this.done;
  }
}
