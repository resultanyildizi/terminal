function MainMenuUI() {
  // styles of the start button
  let playerColor = "red";
  startButton = createButton("Start");
  input = createInput().attribute("placeHolder", "Enter Your Name");
  title = createDiv("TERMINAL");

  title.parent("sketchHolder");
  title.position(width / 2 - 110, height / 2 - 80);
  title.id("title");

  input.parent("sketchHolder");
  input.position(width / 2 - 110, height / 2 - 20);
  input.size(220, 30);
  input.id("nameInput");

  redButton = createButton("");
  redButton.parent("sketchHolder");
  redButton.size(40, 40);
  redButton.position(width / 2 - 100, height / 2 + 35);
  redButton.id("colorButtonRed");

  yellowButton = createButton("");
  yellowButton.parent("sketchHolder");
  yellowButton.size(40, 40);
  yellowButton.position(width / 2 - 50, height / 2 + 35);
  yellowButton.id("colorButtonYellow");

  blackButton = createButton("");
  blackButton.parent("sketchHolder");
  blackButton.size(40, 40);
  blackButton.position(width / 2, height / 2 + 35);
  blackButton.id("colorButtonBlack");

  blueButton = createButton("");
  blueButton.parent("sketchHolder");
  blueButton.size(40, 40);
  blueButton.position(width / 2 + 50, height / 2 + 35);
  blueButton.id("colorButtonBlue");

  startButton.position(width / 2 - 110, height / 2 + 100);
  startButton.parent("sketchHolder");
  startButton.size(220, 50);
  startButton.id("startButton");

  startButton.mousePressed(function () {
    startButton.style("box-shadow", "0 5px #666");
    startButton.style("transform", "translateY(4px)");

    if (trim(input.value()) != "") {
      let hasFinished = false;
      for (let i = 0; i < globalData.length; i++) {
        console.log(globalData[i].finished);
        hasFinished |= globalData[i].finished;
      }
      if (globalData.length >= maxPlayer || hasFinished) {
        gameisFull = true;
        lobbyReady = false;
        gameReady = false;
      } else {
        game = new Game(input.value(), playerColor);
        game.setup();
        socket.emit("start", game.player);
        lobbyReady = true;

        gameisFull = false;
      }

      startButton.hide();
      input.hide();
      redButton.hide();
      yellowButton.hide();
      blackButton.hide();
      blueButton.hide();
      title.hide();
    }
  });

  startButton.mouseReleased(function () {
    startButton.style("box-shadow", "0 9px #999");
    startButton.style("transform", "translateY(-4px)");
  });

  redButton.mousePressed(function () {
    startButton.style("background-color", "#d84d4d");
    input.style("border", "2px solid #d84d4d");
    input.style("background", "#ffd2d2");
    playerColor = "red";
  });

  yellowButton.mousePressed(function () {
    startButton.style("background-color", "#d6d84d");
    input.style("border", "2px solid #d6d84d");
    input.style("background", "#feffd0");
    playerColor = "yellow";
  });

  blackButton.mousePressed(function () {
    startButton.style("background-color", "#4e4c4c");
    input.style("border", "2px solid #4e4c4c");
    input.style("background", "white");
    playerColor = "black";
  });

  blueButton.mousePressed(function () {
    startButton.style("background-color", "#4d56d8");
    input.style("border", "2px solid #4d56d8");
    input.style("background", "#cfd2ff");
    playerColor = "blue";
  });
}

function lobby() {
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text(
    "Waiting for other players...\n" + game.players.length + "/" + maxPlayer,
    width / 2,
    height / 2
  );
}

function gameFull() {
  fill(255);
  textAlign(CENTER);
  textSize(24);
  text(
    "Game already started\nPlease wait for other players to finish!",
    width / 2,
    height / 2
  );
}

function gameFinished() {
  title = createDiv("TERMINAL");
  title.parent("sketchHolder");
  title.position(width / 2 - 110, 200);
  title.id("title");
  push();
  stroke(255);
  textSize(40);
  background(30, 30, 30, 150);
  fill(game.winner.color.toUpperCase());
  textFont("Georgia");
  text("The winner is\n" + game.winner.name, width / 2, height / 2);
  pop();
  noLoop();
}
