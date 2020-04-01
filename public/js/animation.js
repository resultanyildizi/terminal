class Animation {
  constructor(sheet, data, stopLast = false) {
    this.animation = [];
    this.spriteSheet = sheet;
    this.index = 0;
    this.spriteData = data;
    this.stopLast = stopLast;

    let frames = this.spriteData.frames;

    for (let i = 0; i < frames.length; i++) {
      let pos = frames[i].position;
      let img = this.spriteSheet.get(pos.x, pos.y, pos.w, pos.h);
      this.animation.push(img);
    }
  }

  play(x, y, dir, speed = 0.2, scalar = 2) {
    let im;
    if (this.stopLast && floor(this.index) == this.animation.length - 1) {
      im = this.animation[this.animation.length - 1];
    } else {
      im = this.animation[floor(this.index) % this.animation.length];
      this.index += speed;
    }

    push();
    translate(x, y);
    scale(dir, 1);
    imageMode(CENTER);
    image(im, 0, 0, im.width * scalar, im.height * scalar);
    pop();
  }
}
