class RigidBody {
    constructor(w, h) {
        this.w = w;
        this.h = h;

        this.mass = 1;
        this.friction = 1;
        this.gravity = createVector(0, 0.3);
    }

    /*constructor(x, y, r) {

    }*/

    update() {
    }

    draw(x, y) {
        strokeWeight(2);
        stroke("GREEN");
        noFill();
        rect(x, y, this.w, this.h);
    }
}