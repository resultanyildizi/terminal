let platformArr = [];

class LevelDesigner {
    constructor(file) {
        this.file = file;
        this.platforms = [];
        this.loadFile();

        this.platforms = platformArr;
    }

    loadFile() {
        loadStrings(this.file, this.fileLoaded);
    }

    fileLoaded(data) {
        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < data[i].length; j++) {
                
                let platform; 

                if(data[i].charAt(j) == 1) {
                    platform = new Platform(j * 64, i * 64, platformSprite1);
                    platformArr.push(platform);
                   
                } if(data[i].charAt(j) == 2) {
                    platform = new Platform(j * 64, i * 64, platformSprite2);
                    platformArr.push(platform);
                }


            }
        }
    }

   

}