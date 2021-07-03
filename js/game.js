let game_W = 20;
let game_H = 20;
let XXX = 0, YYY = 0;
let R = 0, r = 0;
let drag = false;
let d = false;
let angle = 90;
let ChAngle = -1;
var bg = new Image();
bg.src="images/background.png";
var hook = new Image();
hook.src="images/hook.png";

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
        this.listenMouse();
    }

    listenKeyboard() {
        document.addEventListener("keydown", key => {
            this.solve();
        })
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {
            this.solve();
        })
    }

    solve() {
        if (!drag) {
            drag = true;
            d = true;
        }
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 30);
    }

    update() {
        this.render();
        if (!drag) {
            angle += ChAngle;
            if (angle >= 180 || angle <= 0)
                ChAngle = -ChAngle;
        } else {
            if (r < 10 * this.getWidth() && d)
                r += this.getWidth() / 2;
            else {
                d = false;
                r -= this.getWidth() / 2;
            }
            if (r < R) {
                r = R;
                drag = false;
            }
        }
    }

    render() {
        if (game_W != document.documentElement.clientWidth || game_H != document.documentElement.clientHeight) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            game_W = this.canvas.width;
            game_H = this.canvas.height;
            XXX = game_W / 2;
            YYY = game_H * 0.185;
            R = r = this.getWidth() * 2;
        }
    }

    draw() {
        this.clearScreen();

        this.context.beginPath();
        this.context.strokeStyle  = "#000000";
        this.context.lineWidth = Math.floor(this.getWidth() / 10);
        this.context.moveTo(XXX, YYY);
        this.context.lineTo(XXX + r * Math.cos(this.toRadius(angle)), YYY + r * Math.sin(this.toRadius(angle)));
        this.context.stroke();

        this.context.drawImage(hook, XXX + r * Math.cos(this.toRadius(angle)) - this.getWidth() / 4, YYY + r * Math.sin(this.toRadius(angle)) - this.getWidth() / 8, this.getWidth() / 2, this.getWidth() / 2);
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
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