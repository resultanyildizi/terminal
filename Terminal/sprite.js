


class Sprite {
    constructor(sheet, data, scalar) {
        this.animation = [];
        this.spriteSheet = sheet;
        this.spriteData = data;
        this.scalar = scalar;
        this.index = 0;

        let frames = this.spriteData.frames;

        for (let i = 0; i < frames.length; i++) {
            let pos = frames[i].position;
            let img = this.spriteSheet.get(pos.x, pos.y, pos.w, pos.h);
            this.animation.push(img);
        }

        console.log(this.animation[0]);
    }

    draw(x, y, speed) {
        this.index += speed;
        let im = this.animation[floor(this.index) % this.animation.length];
        image(im, x, y, im.width * this.scalar, im.height * this.scalar);
    }
}

