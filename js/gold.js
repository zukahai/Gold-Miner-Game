var goldIm = new Image();
goldIm.src="images/gold.png";

class gold {
    constructor(game, x, y) {
        this.game = game;
        this.x = 2 * this.game.getWidth() + Math.random() * (game_W - 4 * this.game.getWidth());
        this.y = 2 * this.game.getWidth() + game_H / 3 + Math.random() * (2 * game_H / 3 - 4 * this.game.getWidth());
    }

    init() {

    }

    draw() {
        this.game.context.drawImage(goldIm, this.x, this.y, this.game.getWidth(), this.game.getWidth() * 0.5);
    }
}