let player;

function setup() {
    createCanvas(1800, 600 );
    loadResources();
    
    let res = resources["yellow"];

    
    player = new Player("Resul", res, 100, 100);
    player.setup();
    
    console.log(resources);

}

function draw() {
    background(51);

    player.update();
    player.show();

}




