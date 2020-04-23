function MainMenuUI() {
  // styles of the start button
  let playerColor = "red";
  startButton = createButton("Start");
  input = createInput().attribute("placeHolder", "Enter Your Name");

  input.parent("sketchHolder");
  input.position(width / 2 - 110, height / 2 - 20);
  input.size(220, 30);
  input.style("font-size", "16px");
  input.style("border-radius", "8px");
  input.style("text-align", "center");
  input.style("outline", "none");
  input.style("border", "2px solid #4CAF50");

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
      game = new Game(input.value(), playerColor);
      game.setup();
      socket.emit("start", game.player);
      gameReady = true;
      startButton.hide();
      input.hide();
      redButton.hide();
      yellowButton.hide();
      blackButton.hide();
      blueButton.hide();
    }
  });

  startButton.mouseReleased(function () {
    startButton.style("box-shadow", "0 9px #999");
    startButton.style("transform", "translateY(-4px)");
  });

  input.mousePressed(function () {
    input.value("");
    input.style("border", "2px solid #367c39");
    input.style("background-color", "#a6d8a8");
  });

  redButton.mousePressed(function () {
    startButton.style("background-color", "#d84d4d");
    playerColor = "red";
  });

  yellowButton.mousePressed(function () {
    startButton.style("background-color", "#d6d84d");
    playerColor = "yellow";
  });

  blackButton.mousePressed(function () {
    startButton.style("background-color", "#4e4c4c");
    playerColor = "black";
  });

  blueButton.mousePressed(function () {
    startButton.style("background-color", "#4d56d8");
    playerColor = "blue";
  });
}
