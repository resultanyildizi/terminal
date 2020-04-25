class Bullet {
  constructor(id, x, y, dir) {
    this.id = id;
    this.speed = 30;
    this.dir = dir;
    this.pos_x = x;
    this.pos_y = y;
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
  }

  isOut() {
    return this.pos_x < 0 || this.pos_x > width;
  }
}
