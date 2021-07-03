var goldIm = new Image();
goldIm.src="images/gold.png";

class gold {
    constructor(game) {
        this.game = game;
        this.init();
    }

    init() {
        this.type = Math.floor(Math.random() * 100000) % 3;
        this.x = 2 * this.game.getWidth() + Math.random() * (game_W - 4 * this.game.getWidth());
        this.y = 2 * this.game.getWidth() + game_H / 3 + Math.random() * (2 * game_H / 3 - 4 * this.game.getWidth());
        this.alive = true;
        switch (this.type) {
            case 0:
                this.speed = this.game.getWidth() / 4;
                this.size = this.game.getWidth();
                break;
            case 1:
                this.speed = this.game.getWidth() / 7;
                this.size = this.game.getWidth() * 1.5;
                break;
            case 2:
                this.speed = this.game.getWidth() / 10;
                this.size = this.game.getWidth() * 2;
                break;
        }
    }

    draw() {
        this.game.context.drawImage(goldIm, this.x - this.size / 2, this.y - this.size / 4, this.size, this.size / 2);
    }
}