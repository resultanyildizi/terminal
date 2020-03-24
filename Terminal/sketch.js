let sprite;
let spriteSheet;
let spriteData;



function preload() {
    let type = "Death"; 
    let color = "Blue";

    spriteSheet = loadImage("res/character_sprites/" + color + "/Gunner_" + color + "_" + type +".png");
    spriteData  = loadJSON("res/json_files/Character_" + type + ".json");
}

function setup() {
    createCanvas(900, 600);
    animation = new Animation(spriteSheet, spriteData, 100, 100);
   
}

function draw() {
    background(51);
    animation.play(0.2, 2, true);
}