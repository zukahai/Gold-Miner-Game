var goldIm = new Image();
goldIm.src="images/gold.png";
var rockIm = new Image();
rockIm.src="images/rock.png";
var diamondIM = new Image();
diamondIM.src="images/diamond.png";

class gold {
    constructor(game) {
        this.game = game;
        this.init();
    }

    init() {
        this.type = Math.floor(Math.random() * 100000) % 8;
        this.x = 2 * this.game.getWidth() + Math.random() * (game_W - 4 * this.game.getWidth());
        this.y = 2 * this.game.getWidth() + game_H / 3 + Math.random() * (2 * game_H / 3 - 4 * this.game.getWidth());
        this.alive = true;
        switch (this.type) {
            case 0:
                this.speed = this.game.getWidth() / 4;
                this.width = this.game.getWidth();
                this.height = this.game.getWidth() / 2;
                this.IM = goldIm;
                break;
            case 1:
                this.speed = this.game.getWidth() / 7;
                this.width = this.game.getWidth();
                this.height = this.game.getWidth() / 2;
                this.IM = goldIm;
                break;
            case 2:
                this.speed = this.game.getWidth() / 10;
                this.width = 1.5 * this.game.getWidth();
                this.height = 1.5 * this.game.getWidth() / 2;
                this.IM = goldIm;
                break;
            case 3:
                this.speed = this.game.getWidth() / 7;
                this.width = 1.5 * this.game.getWidth();
                this.height = 1.5 * this.game.getWidth();
                this.IM = rockIm;
                break;
            case 4:
                this.speed = this.game.getWidth() / 10;
                this.width = 1.5 * this.game.getWidth();
                this.height = 1.5 * this.game.getWidth();
                this.IM = rockIm;
                break;
            case 5:
                this.speed = this.game.getWidth() / 15;
                this.width = 2 * this.game.getWidth();
                this.height = 2 * this.game.getWidth();
                this.IM = rockIm;
                break;
            case 6:
            case 7:
                this.speed = this.game.getWidth() / 2.5;
                this.width = this.game.getWidth() / 2;
                this.height = this.game.getWidth() / 2.5;
                this.IM = diamondIM;
                break;
        }
    }

    randomXY() {
        this.x = 2 * this.game.getWidth() + Math.random() * (game_W - 4 * this.game.getWidth());
        this.y = 2 * this.game.getWidth() + game_H / 3 + Math.random() * (2 * game_H / 3 - 4 * this.game.getWidth());
    }

    draw() {
        this.game.context.drawImage(this.IM, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }

    size() {
        return Math.sqrt(this.width * this.width + this.height * this.height) / 2;
    }
}