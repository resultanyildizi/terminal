// This is a class for holding sprite and json resources for animations of players.
class Resource {
    constructor(name) {
        this.name = name;
        this.spriteSheets = [];
        this.spriteDatas = [];
        this.shadow;
    }
}
// Defining the certain types of players and their animation types.
let typeArr = ["Crouch", "Death", "Idle", "Jump", "Run"];
let clrArr  = ["Black", "Yellow", "Red", "Blue"];


let currSheets = [];
let currDatas  = [];
let currShadow;
// preload is a reserved function to upload the resources for the project, in advance.
function preload() {
    for(let i = 0; i < clrArr.length; i++) {
        for(let j = 0; j < typeArr.length; j++) {
            let source = "res/character_sprites/" + clrArr[i] + "/Gunner_" + clrArr[i] + "_" + typeArr[j] +".png";
            spriteSheet = loadImage(source);
            currSheets.push(spriteSheet);
        }
    }

    for(let i = 0; i < typeArr.length; i++) {
        let source = "res/json_files/Character_" + typeArr[i] + ".json";
        spriteData = loadJSON(source);
        currDatas.push(spriteData);
    }

    currShadow = loadImage("res/extras/Shadow.png");

    // console.log(currSheets);
    // console.log(currDatas); 
}

let resources = [];
function loadResources() {

    resources = {"black": new Resource("black"), "yellow": new Resource("yellow"), "red": new Resource("yellow"), "blue": new Resource("blue")};

    let keys = Object.keys(resources);
    console.log(currSheets[4]);

    for(let i = 0; i < keys.length; i++) {
        for(let j = 0; j < typeArr.length; j++) {

            resources[keys[i]].spriteSheets.push(currSheets[i * typeArr.length + j]);
        }
        resources[keys[i]].spriteDatas = currDatas;
        resources[keys[i]].shadow = currShadow;
    }
}



