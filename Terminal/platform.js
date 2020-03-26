class Platform {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        
        this.sprite = sprite;

        this.w = sprite.width * 2;
        this.h = sprite.height * 2;
    }

    show() {
        image(this.sprite, this.x, this.y, this.w, this.h);
        // rect(this.x, this.y + this.h / 2, this.w, this.h / 2);
    }
}
