// defining animation enums

const SPACE = 32;
const CRCH = 67;

class Player {
  constructor(id, name, _x, _y, color) {
    this.id = id;
    this.name = name;
    this.color = color;

    this.speed = 7;
    this.direction = 1;

    this.health = 20.0;
    this.armor = 0.0;

    this.currentAnimation = "idle";
    this.isDead = false;
    this.pos = { x: _x, y: _y };

    this.rigidBody;
    this.score = 0;
    this.bullets = [];
    this.bullet_y = 5;
    this.shootingDelay = 5;
    this.respawnTime = 300.0;
    this.finished = false;
  }

  setup() {
    this.rigidBody = new RigidBody(this.pos, 10, 60);
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
      currShadow,
      shadowx,
      shadowy,
      currShadow.width * 2,
      currShadow.height * 2
    ); // shadow

    if (game.allAnimations[this.id] != undefined)
      game.allAnimations[this.id][this.currentAnimation].play(
        this.pos.x,
        this.pos.y,
        this.direction,
        0.2,
        2
      ); // player

    // drawing health bar
    push();
    noStroke();
    fill("RED");
    rect(this.pos.x - 30, this.pos.y - 50, 100.0 * 0.6, 7.0);
    fill("GREEN");
    rect(this.pos.x - 30, this.pos.y - 50, this.health * 0.6, 7.0);
    pop();

    fill(255);
    textAlign(CENTER);
    textSize(12);
    text(this.name + " %" + floor(this.health), this.pos.x, this.pos.y - 60); // name
  }

  update() {
    this.rigidBody.acc.y += this.rigidBody.gravity.y;
    this.rigidBody.acc.x += this.rigidBody.gravity.x;

    this.rigidBody.vel.y += this.rigidBody.acc.y;
    this.rigidBody.vel.x += this.rigidBody.acc.x;

    this.rigidBody.pos.y += this.rigidBody.vel.y;
    this.rigidBody.pos.x += this.rigidBody.vel.x;

    this.rigidBody.acc.y = 0;
    this.rigidBody.acc.x = 0;

    if (this.pos.y >= height + 100 && !this.isDead) {
      this.rigidBody.vel.y = 0;
      this.rigidBody.gravity.y = 0;
      this.isDead = true;
      if (this.score > 0) this.score -= 10;
    }

    if (!this.isDead) {
      this.move();
      this.shoot();
    } else {
      this.die();
    }
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
    if (!keyIsPressed) {
      this.currentAnimation = "idle";
      this.bullet_y = 5;
    } else {
      // Send current player's updated datas to the other clients
    }
    if (!(keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW))) {
      this.rigidBody.vel.x = 0;
      this.currentAnimation = "idle";
      this.bullet_y = 5;
    }
    if (
      (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) &&
      !keyIsDown(DOWN_ARROW)
    ) {
      this.walk();
      if (this.rigidBody.collides) this.currentAnimation = "run";
      this.bullet_y = 5;
    }
    if (keyIsDown(UP_ARROW) && this.rigidBody.collides) {
      this.keyPressed();
      this.bullet_y = 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.crouch();
      this.currentAnimation = "crouch";
      // this.rigidBody.h = this.rbh - 20;
      this.bullet_y = 0;
    } else {
      this.rigidBody.h = 60;
    }

    /*if (keyIsDown(SPACE)) {
      this.die();
      this.currentAnimation = "death";
    }*/
  }

  walk() {
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
    jump_sound.setVolume(0.5);
    jump_sound.play();
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

  shoot() {
    if (keyIsDown(SPACE) && this.shootingDelay <= 0.0) {
      let bullet = new Bullet(
        this.id,
        this.pos.x,
        this.pos.y - this.bullet_y,
        this.direction
      );
      socket.emit("shoot", bullet);
      game.bullets.push(bullet);
      this.shootingDelay = 20;
    }

    this.shootingDelay -= 1.0;
  }

  die() {
    this.currentAnimation = "death";
    this.rigidBody.vel.x = 0;

    this.respawnTime -= 1.0;
    if (this.respawnTime <= -1) {
      this.respawn();
    }
  }

  getDamage() {
    if (this.health > 0) {
      this.health -= bulletDamage;
    }
    if (this.health <= 0) {
      this.isDead = true;
      this.health = 0;
    }
  }

  getScore() {
    this.score += 10;
  }

  heal(amount) {
    this.health += amount;
    if (this.health >= 100.0) this.health = 100.0;
  }

  respawn() {
    this.rigidBody.gravity.y = 0.5;
    this.health = 100.0;
    this.armor = 0.0;
    this.dir = 1;
    this.currentAnimation = "idle";
    this.pos.x = 1400;
    this.pos.y = 100;
    this.isDead = false;
    this.respawnTime = 300.0;
  }

  collidesPlatforms() {
    this.rigidBody.collides = false;
    for (let i = 0; i < game.platforms.length; i++)
      this.rigidBody.collides |=
        this.rigidBody.collidesPlatform(game.platforms[i]) ||
        this.rigidBody.collides;
    return;
  }

  playerToData() {
    let data = {
      id: this.id,
      name: this.name,
      color: this.color,
      direction: this.direction,
      currentAnimation: this.currentAnimation,
      health: this.health,
      armor: this.armor,
      pos: this.pos,
      rigidBody: this.rigidBody,
    };

    return data;
  }
}

function dataToPlayer(playerData) {
  let currPlayer = new Player(
    playerData.id,
    playerData.name,
    playerData.pos.x,
    playerData.pos.y,
    playerData.color
  );

  currPlayer.currentAnimation = playerData.currentAnimation;
  currPlayer.direction = playerData.direction;

  return currPlayer;
}
