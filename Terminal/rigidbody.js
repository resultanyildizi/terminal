class RigidBody {
    constructor(pos, w, h) {
        this.w = w;
        this.h = h;
        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.mass = 1;
        this.friction = 1;
        this.gravity = createVector(0, 0.5);
    }
    /*constructor(x, y, r) {

    }*/
    

    collidesPlatform(plt) {
        //console.log(plt);
        let myBottom = this.pos.y + this.h / 2;
        let myTop    = this.pos.y - this.h / 2;
        let myLeft   = this.pos.x - this.w / 2;
        let myRight  = this.pos.x + this.w / 2;

        let ptBottom = plt.y + plt.h;
        let ptTop    = plt.y + plt.h * 0.40;
        let ptLeft   = plt.x;
        let ptRight  = plt.x + plt.w;

        push();
        stroke("RED");
        strokeWeight(6);
        // point(ptLeft, ptTop);
        // point(ptRight, ptBottom);
        pop();

        // return (myBottom >= ptTop && myRight >= ptLeft && myLeft <= ptRight && myTop <= ptBottom)

        if(myBottom >= ptTop && myRight >= ptLeft && myLeft <= ptRight && myTop <= ptBottom) {
            this.collidesTop(plt);
            this.collidesLeft(plt);
            return true;
        }   
    }

    collidesTop(plt) {
        if(this.vel.y >= 0) {
            this.vel.add(0, -this.vel.y - 0.5);
        }
    }

    collidesLeft(plt) {
        if(this.vel.x <= -1) {
            console.log(this.vel.x);
            this.vel.add(-this.vel.x - 0.5, 0);
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