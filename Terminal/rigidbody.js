class RigidBody {
    constructor(w, h) {
        this.w = w;
        this.h = h;


        this.mass = 1;
        this.friction = 1;
        this.gravity = createVector(0, 0.5);
    }
    /*constructor(x, y, r) {

    }*/

    update() {
    }

    draw(x, y) {
        strokeWeight(2);
        stroke("GREEN");
        noFill();
        
        push();
            translate(x, y);
            rectMode(CENTER);
            //rect(0, 0, this.w, this.h);
            pop();
    }
}