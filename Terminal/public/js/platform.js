class Platform {
  constructor(x, y, type, sprite) {
    this.x = x;
    this.y = y;

    this.sprite = sprite;

    this.w = sprite.width * 2;
    this.h = sprite.height * 2;
    this.type = type;
  }

  show() {
    image(this.sprite, this.x, this.y, this.w, this.h);
    // rect(this.x, this.y + this.h * 0.4, this.w, this.h * 0.6);
  }
}
