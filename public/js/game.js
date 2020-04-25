class Game {
  constructor(pname, pcolor) {
    this.player;
    this.players = [];
    this.bullets = [];
    this.platforms = [];
    this.levelDesigner;

    this.pname = pname;
    this.pcolor = pcolor;
    this.allAnimations = {};

    this.socket = socket;
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

    for (let i = 0; i < this.bullets.length; ++i) {
      this.bullets[i].move();
      this.bullets[i].draw();
      if (this.bullets[i].isOut()) this.bullets.splice(i, 1);
    }
    // Update and draw the current player
    this.player.update();
    this.player.show();
  }
}
