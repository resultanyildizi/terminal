let gameTime = 120;
let maxPlayer = 3;
class Game {
  constructor(pname, pcolor) {
    this.player;
    this.players = [];
    this.bullets = [];
    this.platforms = [];
    this.healer = new Heal();
    this.levelDesigner;
    this.pname = pname;
    this.pcolor = pcolor;
    this.allAnimations = {};
    this.socket = socket;
    this.timer;
    this.prevTime = 0;

    this.winner = {
      id: "",
      name: "",
      score: 0,
      color: "",
    };
  }

  setup() {
    // Create the level
    this.levelDesigner = new LevelDesigner("res/levels//level2.txt");
    this.platforms = this.levelDesigner.platforms;

    // Create the current player
    this.player = new Player(0, this.pname, 1400, 100, this.pcolor);
    this.player.setup();
    // Send the player data to the other clients
  }

  findWinner() {
    let other;

    for (let i = 0; i < game.players.length; i++) {
      if (game.players[i].id != game.player.id) other = game.players[i];
    }

    console.log(other);

    if (game.player.score > other.score) {
      this.winner.id = game.player.id;
      this.winner.color = game.player.color;
      this.winner.score = game.player.score;
      this.winner.name = game.player.name;
    } else if (other.score > game.player.score) {
      this.winner.id = other.id;
      this.winner.color = other.color;
      this.winner.score = other.score;
      this.winner.name = other.name;
    } else {
      this.winner.color = "green";
      this.winner.score = game.player.score;
      this.winner.name = game.player.name + "-" + other.name;
    }

    this.player.finished = true;
    socket.emit("update", this.player);
  }

  draw() {
    // Draw the platforms
    for (let i = 0; i < this.platforms.length; i++) {
      this.platforms[i].show();
    }

    // Draw all other players except the current itself
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id !== this.socket.id) {
        this.players[i].show();
      }
    }

    // Draw all bullets
    for (let i = 0; i < this.bullets.length; ++i) {
      this.bullets[i].update();
      this.bullets[i].draw();
      if (this.bullets[i].isOut()) this.bullets.splice(i, 1);
    }

    if (this.healer.isGone == false) {
      this.healer.heal();
      this.healer.draw();
    }

    // Update and draw the current player
    this.player.update();
    this.player.show();

    // drawing score
    push();
    fill("GREEN");
    stroke("WHITE");
    textAlign(LEFT);
    textSize(24);
    text("SCORE: " + this.player.score, 10, 34);
    pop();

    // drawing countdown
    if (game.player.isDead) {
      push();
      fill("WHITE");
      noStroke();
      textAlign(CENTER);
      textSize(48);
      text(
        "GAME WILL RESTART IN: " +
          (floor(game.player.respawnTime / 100) + 1) +
          "s",
        width / 2,
        60
      );
      pop();
    }

    // drawing game time
    push();
    fill(255);
    textSize(24);
    let currentTime = floor(gameTime - (millis() - this.timer) / 1000);

    if (currentTime % 5 == 0 && currentTime != this.prevTime) {
      this.healer = new Heal();
      this.prevTime = currentTime;
    }
    if (currentTime <= 0) {
      this.findWinner();
      gameReady = false;
      lobbyReady = false;
      socket.emit("gameStat", "unknown");
      gameFinished();
    }
    text(currentTime + "s", width - 40, 40);

    if (game.players.length < 1) {
      socket.emit("gameStat", "unknown");
      location.reload();
    }
    pop();
  }
}
