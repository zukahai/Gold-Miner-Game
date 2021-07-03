let game_W = 20;
let game_H = 20;
let XXX = 0, YYY = 0;
let angle = 90;
let ChAngle = -1;
var bg = new Image();
bg.src="images/background.jpg";

class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.render();
        
        this.loop();

        this.listenKeyboard();
        this.listenTouch();
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            var x = evt.touches[0].pageX;
            var y = evt.touches[0].pageY;
        })

        document.addEventListener("touchstart", evt => {
            var x = evt.touches[0].pageX;
            var y = evt.touches[0].pageY;
        })
    }

    listenKeyboard() {
        document.addEventListener("keydown", key => {
            
        })
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 30);
    }

    update() {
        this.render();
        angle += ChAngle;
        if (angle >= 180 || angle <= 0)
            ChAngle = -ChAngle;
    }

    render() {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        game_W = this.canvas.width;
        game_H = this.canvas.height;
        XXX = game_W / 2;
    }

    draw() {
        this.clearScreen();

        this.context.beginPath();
        this.context.strokeStyle  = "#00FF00";
        this.context.lineWidth = Math.floor(this.getWidth() / 10);
        this.context.moveTo(XXX, YYY);
        this.context.lineTo(XXX + 100 * Math.cos(this.toRadius(angle)), YYY + 100 * Math.sin(this.toRadius(angle)));
        this.context.stroke();
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        if (bg.width / game_W < bg.height / game_H)
            this.context.drawImage(bg, 0, (bg.height - game_H * (bg.width / game_W)) / 2, bg.width, game_H * (bg.width / game_W), 0, 0, game_W, game_H);
        else
            this.context.drawImage(bg, (bg.width - game_W * (bg.height / game_H)) / 2, 0, game_W * (bg.height / game_H), bg.height, 0, 0, game_W, game_H);
    }

    getWidth() {
        var area = document.documentElement.clientWidth * document.documentElement.clientHeight;
        return Math.sqrt(area / 400);
    }

    toRadius(angle) {
        return (angle / 180) * Math.PI;
    }
}

var g = new game();