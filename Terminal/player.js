// defining animation enums
const CROUCH = 0;
const DEATH  = 1;
const IDLE   = 2;
const JUMP   = 3;
const RUN    = 4;

const SPACE = 32;
const CRCH = 67;

class Player {
    constructor(name, resource, x, y) {
        this.name = name;
        this.resource = resource;
        
        this.speed = 7;
        this.direction;

        this.health = 100.0;
        this.armor = 0.0;
        
        this.animations = [];
        this.currentAnimation;
        this.sounds = [];
        
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.rigidBody;
        this.gun;
        this.UI;
    }

    setup() {
        this.resourceToAnimations();
        this.rigidBody = new RigidBody(40, 60);
    }

    show() {
        image(this.resource.shadow, this.pos.x + 28, this.pos.y + 60, this.resource.shadow.width * 2, this.resource.shadow.height * 2);
        this.currentAnimation.play(this.pos.x, this.pos.y, 0.2, 2);
        this.rigidBody.draw(this.pos.x + 25, this.pos.y + 15);
    }

    update() {
        if(!keyIsPressed) {
            this.currentAnimation = this.animations["idle"];
            this.vel.set(0, this.vel.y);
        } if(keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
            this.move();
            this.currentAnimation = this.animations["run"];
        } if(keyIsDown(UP_ARROW)) {
            this.jump();
            this.currentAnimation = this.animations["jump"];
        } if(keyIsDown(DOWN_ARROW)) {
            this.crouch();
            this.currentAnimation = this.animations["crouch"];
        } if(keyIsDown(SPACE)) {
            this.die();
            this.currentAnimation = this.animations["death"];
        }


        this.acc.add(this.rigidBody.gravity);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
        if(this.pos.y > height / 2) {
            this.pos.y = height / 2;
            this.vel.set(this.vel.x, 0);
        }
    }


    move() {
        if(keyIsDown(RIGHT_ARROW))
            this.direction = 1;

        if(keyIsDown(LEFT_ARROW)) 
            this.direction = -1;

        this.vel.set(this.speed * this.direction, 0);

        function keyReleased() {
            if(keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
                this.vel.set(0, this.vel.y);
            }
        }


        console.log(this.vel.x + " - " + this.vel.y);
    }

    jump() {

    }

    crouch() {
    }
    
    die() {

    }

    resourceToAnimations() {
        let res = this.resource;
        this.animations = {
            "crouch": new Animation(res.spriteSheets[CROUCH], res.spriteDatas[CROUCH], true),
            "death" : new Animation(res.spriteSheets[DEATH],  res.spriteDatas[DEATH],  true),
            "idle"  : new Animation(res.spriteSheets[IDLE],   res.spriteDatas[IDLE],   false),
            "jump"  : new Animation(res.spriteSheets[JUMP],   res.spriteDatas[JUMP],   true),
            "run"   : new Animation(res.spriteSheets[RUN],    res.spriteDatas[RUN],    false)
        };
    }
}


