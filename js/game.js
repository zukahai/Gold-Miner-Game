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
let ChAngle = -1;
index = -1;
var bg = new Image();
bg.src="images/background.png";
var hook = new Image();
hook.src="images/hook.png";

let N = 10;

class game {
    constructor(score) {
        this.canvas = null;
        this.context = null;
        this.score = score;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.render();
        this.gg = [];
        this.newGold();
        this.initGold();
        this.loop();
        this.listenKeyboard();
        this.listenMouse();
    }

    newGold() {
        for (let i = 0; i < N; i++)
            this.gg[i] = new gold(this);
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
        setTimeout(() => this.loop(), 10);
        if (this.checkWin())
            this.newGold();
    }

    update() {
        this.render();
        Xh = XXX + r * Math.cos(this.toRadian(angle));
        Yh = YYY + r * Math.sin(this.toRadian(angle));
        if (!drag) {
            angle += ChAngle;
            if (angle >= 165 || angle <= 15)
                ChAngle = -ChAngle;
        } else {
            if (r < MaxLeng && d && !ok)
                r += this.getWidth() / 5;
            else {
                d = false;
                r -= speedReturn / 2.5;
            }
            if (r < R) {
                r = R;
                drag = false;
                ok = false;
                index = -1;
                for (let i = 0; i < N; i++)
                if (this.gg[i].alive && this.range(Xh, Yh, this.gg[i].x, this.gg[i].y) <= 2 * this.getWidth()) {
                    this.gg[i].alive = false;
                    this.score += this.gg[i].score;
                }
            }
        }
        if (drag && index == -1) {
            for (let i = 0; i < N; i++)
                if (this.gg[i].alive && this.range(Xh, Yh, this.gg[i].x, this.gg[i].y) <= this.gg[i].size()) {
                    ok = true;
                    index = i;
                    break;
                }
        }
        if (index != -1) {
            this.gg[index].x = Xh;
            this.gg[index].y = Yh + this.gg[index].height / 3;
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
            MaxLeng = this.range(XXX, YYY, game_W - 2 * this.getWidth(), game_H - 2 * this.getWidth());
            // N = game_W * game_H / (20 * this.getWidth() * this.getWidth());
            N = 1;
        }
    }

    draw() {
        this.clearScreen();
        for (let i = 0; i < N; i++)
            if (this.gg[i].alive)
                this.gg[i].draw();

        this.context.beginPath();
        this.context.strokeStyle  = "#333333";
        this.context.lineWidth = Math.floor(this.getWidth() / 10);
        this.context.moveTo(XXX, YYY);
        this.context.lineTo(Xh, Yh);

        this.context.stroke();
        this.context.beginPath();
        this.context.arc(XXX, YYY, 3, 0, 2 * Math.PI);
        this.context.stroke();

        this.context.save();
        this.context.translate(Xh, Yh);
        this.context.rotate(this.toRadian(angle - 90));
        this.context.drawImage(hook, - this.getWidth() / 4,- this.getWidth() / 8, this.getWidth() / 2, this.getWidth() / 2);
        this.context.restore();

        this.drawText();
    }

    drawText() {
        this.context.fillStyle = "red";
        this.context.font = this.getWidth() / 1.5 + 'px Stencil';
        this.context.fillText("Score: " + this.score, this.getWidth(), this.getWidth());
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.drawImage(bg, (bg.width - game_W * (bg.height / game_H)) / 2, 0, game_W * (bg.height / game_H), bg.height, 0, 0, game_W, game_H);
    }

    checkWin() {
        let check = true;
        for (let i = 0; i < N; i++)
            if (this.gg[i].alive == true)
                check = false;
        return check;
    }

    initGold() {
        while (true) {
            let check = true;
            for (let i = 0; i < N - 1; i++)
                for (let j = i + 1; j < N; j++)
                    while (this.range(this.gg[i].x, this.gg[i].y, this.gg[j].x, this.gg[j].y) < 2 * this.getWidth()) {
                        check = false;
                        this.gg[j].randomXY();
                    }
            if (check)
                    break;
        }
    }

    getWidth() {
        var area = document.documentElement.clientWidth * document.documentElement.clientHeight;
        return Math.sqrt(area / 300);
    }

    toRadian(angle) {
        return (angle / 180) * Math.PI;
    }

    range(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }
}

new game(0);