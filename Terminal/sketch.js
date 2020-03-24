let sprite;
let spriteSheet;
let spriteData;


function preload() {
    spriteSheet = loadImage("res/character_sprites/Yellow/Gunner_Yellow_Idle.png");
    spriteData  = loadJSON("res/json_files/Character_Idle.json");
}

function setup() {
    createCanvas(900, 600);
    sprite = new Sprite(spriteSheet, spriteData, 2);
   
}

function draw() {
    background(51);
    sprite.draw(100, 100, 0.3);
}