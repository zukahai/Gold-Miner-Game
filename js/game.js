let game_W = 20;
let game_H = 20;
let XXX = 0, YYY = 0, Xh = 0, Yh = 0;
let MaxLeng = 0;
let speedReturn = 0
let R = 0, r = 0;
let drag = false;
let d = false;
let ok = false;
let angle = 90;
let ChAngle = -2.5;
index = -1;
var bg = new Image();
bg.src="images/background.png";
var hook = new Image();
hook.src="images/hook.png";

let N = 15;

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
        this.gg = [];
        for (let i = 0; i < N; i++)
            this.gg[i] = new gold(this);
        
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
            speedReturn = this.getWidth() / 2;
            index = -1;
        }
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 30);
    }

    update() {
        this.render();
        Xh = XXX + r * Math.cos(this.toRadius(angle));
        Yh = YYY + r * Math.sin(this.toRadius(angle));
        if (!drag) {
            angle += ChAngle;
            if (angle >= 165 || angle <= 15)
                ChAngle = -ChAngle;
        } else {
            if (r < MaxLeng && d && !ok)
                r += this.getWidth() / 2;
            else {
                d = false;
                r -= speedReturn;
            }
            if (r < R) {
                r = R;
                drag = false;
                ok = false;
                index = -1;
                for (let i = 0; i < N; i++)
                if (this.gg[i].alive && this.range(Xh, Yh, this.gg[i].x, this.gg[i].y) <= 2 * this.getWidth())
                    this.gg[i].alive = false;
            }
        }
        if (drag && index == -1) {
            for (let i = 0; i < N; i++)
                if (this.gg[i].alive && this.range(Xh, Yh, this.gg[i].x, this.gg[i].y) <= this.gg[i].size) {
                    ok = true;
                    index = i;
                    break;
                }
        }
        if (index != -1) {
            this.gg[index].x = Xh;
            this.gg[index].y = Yh + this.gg[index].size / 4;
            speedReturn = this.gg[index].speed;
        }
    }

    render() {
        if (game_W != document.documentElement.clientWidth || game_H != document.documentElement.clientHeight) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            game_W = this.canvas.width;
            game_H = this.canvas.height;
            XXX = game_W / 2;
            YYY = game_H * 0.18;
            R = r = this.getWidth() * 2;
            MaxLeng = this.range(XXX, YYY, game_W, game_H);
        }
    }

    draw() {
        this.clearScreen();
        for (let i = 0; i < N; i++)
            if (this.gg[i].alive)
                this.gg[i].draw();

        this.context.beginPath();
        this.context.strokeStyle  = "#000000";
        this.context.lineWidth = Math.floor(this.getWidth() / 10);
        this.context.moveTo(XXX, YYY);
        this.context.lineTo(Xh, Yh);
        this.context.stroke();

        this.context.drawImage(hook, Xh - this.getWidth() / 4, Yh - this.getWidth() / 8, this.getWidth() / 2, this.getWidth() / 2);
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.drawImage(bg, (bg.width - game_W * (bg.height / game_H)) / 2, 0, game_W * (bg.height / game_H), bg.height, 0, 0, game_W, game_H);
    }

    getWidth() {
        var area = document.documentElement.clientWidth * document.documentElement.clientHeight;
        return Math.sqrt(area / 300);
    }

    toRadius(angle) {
        return (angle / 180) * Math.PI;
    }

    range(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
}

var g = new game();