
class Player {
    constructor(name, resource, x, y) {
        this.name = name;
        this.resource = resource;
        this.x = x;
        this.y = y;

        this.speed = 0.2 * 5;
        this.health = 100.0;
        this.armor = 0.0;
        
        this.animationSpeed = this.speed / 5;
        this.animations = [];
        this.sounds = [];
        
        this.rigidBody;
        this.gun;
        this.UI;
    }

    show() {

    }

    update() {

    }
}