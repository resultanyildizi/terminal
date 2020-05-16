class Heal {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.amount = 20.0;
        this.r = 30;
        this.isGone = false;
    }


    draw() {
        push();
        stroke(255);
        fill("LIGHTGREEN");
        textAlign(CENTER, CENTER);
        textSize(70);
        text("+", this.x, this.y);
        pop();
    }

    heal() {

        let players = game.players;

        for(let i = 0;  i < players.length; i++) {
            let current = players[i];
            this.collidesPlayer(current);
        }

        
    }

    collidesPlayer(current) {
        let playerRight = current.pos.x  + current.rigidBody.w / 2;
        let playerLeft  = current.pos.x - current.rigidBody.w / 2;
        let playerTop = current.pos.y - current.rigidBody.h / 2;
        let playerBottom = current.pos.y + current.rigidBody.h / 2;
        // Check collision
        if(this.x >= playerLeft && this.x <= playerRight && this.y >= playerTop && this.y <= playerBottom) {
            if(current.id == game.player.id)
                game.player.heal(this.amount);
            this.isGone = true;
        }
    }
}