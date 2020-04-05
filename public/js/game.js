class Game {
  constructor(pname) {
    this.player;
    this.players = [];

    this.platforms = [];
    this.levelDesigner;

    this.pname;
    this.pcolor;
    this.allAnimations = {};

    this.socket = socket;
    this.pname = pname;
  }

  setup() {
    // Create the level
    this.levelDesigner = new LevelDesigner("res/levels//level2.txt");
    this.platforms = this.levelDesigner.platforms;

    // Create the current player
    this.player = new Player(0, this.pname, 1400, 100, "black");
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

    // Update and draw the current player
    this.player.update();
    this.player.show();
  }
}
