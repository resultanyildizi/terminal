let resources = [];




function setup() {
    createCanvas(900, 600);

    loadResources();
   
    console.log(resources);

}

function draw() {
    background(51);

}

function loadResources() {

    resources = {"black": new Resource("black"), "yellow": new Resource("yellow"), "red": new Resource("yellow"), "blue": new Resource("blue")};

    let keys = Object.keys(resources);

    for(let i = 0; i < keys.length; i++) {
        for(let j = 0; j < typeArr.length; j++) {
            resources[keys[i]].spriteSheets.push(i * typeArr + j);
        }
        resources[keys[i]].spriteDatas = currDatas;
    }
}