class RigidBody {
  constructor(pos, w, h) {
    this.w = w;
    this.h = h;

    this.pos = pos;
    this.oldpos = pos;

    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.gravity = { x: 0, y: 0.5 };

    this.collides = false;

    this.friction = 1;
  }

  collidesPlatform(plt) {
    let myBottom = this.pos.y + this.h / 2;
    let myTop = this.pos.y - this.h / 2;
    let myLeft = this.pos.x - this.w / 2;
    let myRight = this.pos.x + this.w / 2;

    let ptBottom = plt.y + plt.h;
    let ptTop = plt.y + plt.h * 0.4;
    let ptLeft = plt.x;
    let ptRight = plt.x + plt.w;

    if (
      myBottom >= ptTop &&
      myRight >= ptLeft &&
      myLeft <= ptRight &&
      myTop <= ptBottom &&
      plt.type != "9"
    ) {
      return this.collidesTop(plt, myBottom, ptTop);
    } else return false;
  }

  collidesTop(plt, myBottom, ptTop) {
    if (this.vel.y > 0) {
      if (myBottom > ptTop && this.oldpos.y <= ptTop) {
        this.vel.y = 0;
        this.pos.y = this.oldpos.y = ptTop - this.h / 2;

        return true;
      }
    }
  }

  draw() {
    strokeWeight(2);
    stroke("GREEN");
    noFill();

    push();
    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
