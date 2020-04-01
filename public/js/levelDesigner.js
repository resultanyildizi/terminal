// NOTE:
// Space   : 0, Top     : 1, Right-Top : 2, Left-Top : 3, Right-Left-Top : 4,
// Right-V : 5, Right-Z : 6, Left-V    : 7, Left-Z   : 9, None           : 9

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
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        let platform;
        let val = data[i].charAt(j);

        if (val == "0") continue;
        else if (val == "6" || val == "8" || val == "9") {
          platform = new Platform(j * 64, i * 64, val, platformSprite2);
        } else {
          platform = new Platform(j * 64, i * 64, val, platformSprite1);
        }

        platformArr.push(platform);
      }
    }
  }
}
