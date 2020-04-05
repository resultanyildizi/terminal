function UI() {
  // styles of the start button
  startButton = createButton("Start");
  input = createInput("Enter your name");

  startButton.position(width / 2 + 40, height / 2 + 50);
  startButton.size(220, 50);
  startButton.style("font-size", "18px");
  startButton.style("border-radius", "8px");
  startButton.style("cursor", "pointer");
  startButton.style("text-align", "center");
  startButton.style("text-decoration", "none");
  startButton.style("outline", "none");
  startButton.style("color", "#fff");
  startButton.style("background-color", "#4CAF50");
  startButton.style("border", "none");
  startButton.style("box-shadow", "0 9px #999");
  startButton.style("transition-duration", "0.2s");

  input.position(width / 2 + 40, height / 2);
  input.size(220, 30);
  input.style("font-size", "16px");
  input.style("border-radius", "8px");
  input.style("text-align", "center");
  input.style("outline", "none");
  input.style("border", "2px solid #4CAF50");

  startButton.mousePressed(function () {
    startButton.style("box-shadow", "0 5px #666");
    startButton.style("transform", "translateY(4px)");

    if (trim(input.value()) != "" && trim(input.value()) != "Enter your name") {
      game = new Game(input.value());
      game.setup();
      socket.emit("start", game.player);
      gameReady = true;
      startButton.hide();
      input.hide();
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
}
