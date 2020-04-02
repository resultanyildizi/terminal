// defining animation enums

const SPACE = 32;
const CRCH = 67;

class Player {
  constructor(id, name, anims, _x, _y, color) {
    this.id = id;
    this.name = name;
    this.color = color;

    this.speed = 7;
    this.direction = 1;

    this.health = 100.0;
    this.armor = 0.0;

    this.animations = anims;
    this.currentAnimation = "idle";
    this.sounds = [];

    this.pos = { x: _x, y: _y };

    this.rigidBody;
    this.rbw = 10;
    this.rbh = 60;
    this.rby = 0;
    this.gun;
    this.UI;
    this.shadow = currShadow;

    this.setup();
  }

  setup() {
    this.rigidBody = new RigidBody(this.pos, this.rbw, this.rbh);
  }

  show() {
    let shadowx;
    let shadowy;

    if (this.direction == 1) {
      shadowx = this.pos.x - 20;
      shadowy = this.pos.y + 12;
    } else {
      shadowx = this.pos.x - 12;
      shadowy = this.pos.y + 12;
    }

    image(
      this.shadow,
      shadowx,
      shadowy,
      this.shadow.width * 2,
      this.shadow.height * 2
    ); // shadow

    this.animations[this.currentAnimation].play(
      this.pos.x,
      this.pos.y,
      this.direction,
      0.2,
      2
    ); // player
    // this.rigidBody.draw(this.pos.x, this.pos.y + this.rby); // rigidbody
  }

  update() {
    if (!keyIsPressed) {
      this.currentAnimation = "idle";
    } else {
      // Send current player's updated datas to the other clients
    }
    if (!(keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))) {
      this.rigidBody.vel.x = 0;
    }
    if (
      (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) &&
      !keyIsDown(DOWN_ARROW)
    ) {
      this.move();
      if (this.rigidBody.collides) this.currentAnimation = "run";
    }
    if (keyIsDown(UP_ARROW) && this.rigidBody.collides) {
      this.keyPressed();
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.crouch();
      this.currentAnimation = "crouch";
      // this.rigidBody.h = this.rbh - 20;
    } else {
      this.rigidBody.h = this.rbh;
    }
    if (keyIsDown(SPACE)) {
      this.die();
      this.currentAnimation = "death";
    }

    this.rigidBody.acc.y += this.rigidBody.gravity.y;
    this.rigidBody.acc.x += this.rigidBody.gravity.x;

    this.rigidBody.vel.y += this.rigidBody.acc.y;
    this.rigidBody.vel.x += this.rigidBody.acc.x;

    this.rigidBody.pos.y += this.rigidBody.vel.y;
    this.rigidBody.pos.x += this.rigidBody.vel.x;

    this.rigidBody.acc.y = 0;
    this.rigidBody.acc.x = 0;

    /*
        if(this.pos.y > height / 2 + 5) {
            this.pos.y = height / 2 + 5;
            this.vel.set(this.vel.x, 0);
        }*/

    this.collidesPlatforms();

    this.pos = this.rigidBody.pos;
  }

  keyPressed() {
    if (keyCode == UP_ARROW) {
      this.jump();
      this.currentAnimation = "jump";
      keyCode = 0;
    }
  }

  move() {
    if (keyIsDown(RIGHT_ARROW)) this.direction = 1;

    if (keyIsDown(LEFT_ARROW)) this.direction = -1;

    this.rigidBody.vel.x = this.speed * this.direction;

    function keyReleased() {
      if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
        this.rigidBody.vel.x = 0;
      }
    }
  }

  jump() {
    let jumpPower = -12.0;
    this.rigidBody.acc.y += jumpPower;
  }

  crouch() {
    if (keyIsDown(DOWN_ARROW)) {
      if (this.rigidBody.vel.x > 0) this.rigidBody.vel.x -= 0.2;
      if (this.rigidBody.vel.x < 0) {
        this.rigidBody.vel.x += 0.2;
      }
      if (this.rigidBody.vel.x <= 0.2 && this.rigidBody.vel.x >= -0.2)
        this.rigidBody.vel.x = 0.0;
    }
  }

  die() {}

  collidesPlatforms() {
    this.rigidBody.collides = false;
    for (let i = 0; i < platforms.length; i++)
      this.rigidBody.collides |=
        this.rigidBody.collidesPlatform(platforms[i]) ||
        this.rigidBody.collides;
    return;
  }

  playerToData() {
    let data = {
      id: this.id,
      name: this.name,
      color: this.color,
      speed: this.speed,
      direction: this.direction,
      currentAnimation: this.currentAnimation,
      health: this.health,
      armor: this.armor,
      pos: this.pos,
      rigidBody: this.rigidBody,
      rbw: this.rbw,
      rbh: this.rbh,
      rby: this.rby
    };

    return data;
  }
}

function _keyIsPressed(key) {
  function keyPressed() {
    return key == keyCode;
  }
}

function dataToPlayer(playerData) {
  let anims;

  if (playerData.color == "yellow") anims = yellowAnimations;
  else if (playerData.color == "red") anims = redAnimations;
  else if (playerData.color == "black") anims = blackAnimations;
  else if (playerData.color == "blue") anims = blueAnimations;
  else anims = redAnimations;

  let currPlayer = new Player(
    playerData.id,
    playerData.name,
    anims,
    playerData.pos.x,
    playerData.pos.y,
    playerData.color
  );

  currPlayer.currentAnimation = playerData.currentAnimation;
  currPlayer.direction = playerData.direction;

  return currPlayer;
}
