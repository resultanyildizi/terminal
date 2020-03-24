


class Animation {
    constructor(sheet, data, x, y) {
        this.animation = [];
        this.spriteSheet = sheet;
        this.index = 0;
        this.spriteData = data;
        
        this.x = x;
        this.y = y;

        let frames = this.spriteData.frames;

        for (let i = 0; i < frames.length; i++) {
            let pos = frames[i].position;
            let img = this.spriteSheet.get(pos.x, pos.y, pos.w, pos.h);
            this.animation.push(img);
        }

        console.log(this.animation[0]);
    }

    play(speed = 0.2, scalar = 2, stopLast = false) {
        let im;
        if(stopLast && floor(this.index) == this.animation.length - 1) {
            im = this.animation[this.animation.length - 1];
        } else {
            im = this.animation[floor(this.index) % this.animation.length];
            this.index += speed;
        }
        image(im, this.x, this.y, im.width * scalar, im.height * scalar);
        
    }

}

