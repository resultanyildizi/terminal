class RigidBody {
    constructor(pos, w, h) {
        this.w = w;
        this.h = h;

        this.pos = pos;
        this.oldpos = pos;

        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.gravity = createVector(0, 0.5);

        this.collides = false;

        this.friction = 1;
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
        let ptTop = plt.y + plt.h * 0.40;       
        let ptLeft   = plt.x;
        let ptRight  = plt.x + plt.w;

        if(myBottom >= ptTop && myRight >= ptLeft && myLeft <= ptRight && myTop <= ptBottom) {
            this.collidesTop(plt, myBottom, ptTop);
            this.collidesLeft(plt, myRight, ptLeft);
            this.collidesRight(plt, myLeft, ptRight);
            return true;
        } else
            return false;
    }


    collidesTop(plt, myBottom, ptTop) {
        if(this.vel.y > 0) {
            if(myBottom > ptTop && this.oldpos.y <= ptTop) {
                
                push();
                    strokeWeight(6);
                        stroke("RED");    
                            point(this.pos.x, myBottom);
                        stroke("YELLOW");
                            line(plt.x, ptTop, plt.x + plt.h, ptTop);
                pop();

                this.vel.y = 0;
                this.pos.y = this.oldpos.y = ptTop - this.h / 2;
            }
        }
    }

    collidesLeft(plt, myRight, ptLeft) {
        if(this.vel.x > 0) {
            if(myRight > ptLeft && this.oldpos.x <= ptLeft) {

                push();
                    strokeWeight(6);
                        stroke("RED");    
                            point(myRight, this.pos.y);
                        stroke("YELLOW");
                            line(plt.x, plt.y + plt.h * 0.30, plt.x, plt.y + plt.h);
                pop();

                this.vel.x = 0;
                this.pos.x  = this.oldpos.x = ptLeft - this.w - 0.001;

            }

        } 
    }

    collidesRight(plt, myLeft, ptRight) {
        if(this.vel.x < 0) {
            if(myLeft < ptRight && this.oldpos.x >= ptRight) {

                push();
                    strokeWeight(6);
                        stroke("RED");    
                            point(myLeft, this.pos.y);
                        stroke("YELLOW");
                            line(plt.x + plt.w, plt.y + plt.h * 0.30, plt.x + plt.w, plt.y + plt.h);
                pop();

                this.vel.x = 0;
                this.pos.x  = this.oldpos.x = ptRight + this.w - 0.001;

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