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
level = -1;
time = 60;
tager = 0;
timeH = 0;
vlH = 0;
var bg = new Image();
bg.src="images/background.png";
var hook = new Image();
hook.src="images/hook.png";
var targetIM = new Image();
targetIM.src="images/target.png";
var dolarIM = new Image();
dolarIM.src="images/dolar.png";
var levelIM = new Image();
levelIM.src="images/level.png";
var clockIM = new Image();
clockIM.src="images/clock.png";


let N = -10;

class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.score = 0;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.render();
        this.newGold();
        this.initGold();
        this.loop();
        this.listenKeyboard();
        this.listenMouse();
    }

    newGold() {
        ok = false;
        index = -1;
        Xh = XXX;
        Yh = YYY;
        r = R;
        drag = false;
        timeH = -1;
        vlH = 0;
        time = 60;
        level ++;
        tager = (level + 1) * 1000 + level * level * 120;
        this.initGold();
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
        if (time > 0 || this.score > tager)
            setTimeout(() => this.loop(), 10);
        if (time <= 0 || this.checkWin()) {
            if (this.score >= tager || this.checkWin()) 
                this.newGold();
            else {
                window.alert("You lose!" + "\n" + "Your Score: " + this.score);
                location.reload();
            }
        }
            
    }

    update() {
        this.render();
        time -= 0.01;
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
                    timeH = time - 0.7;
                    vlH = this.gg[i].score;
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
            R = this.getWidth() * 2;
            if (!drag)
                r = R;
            MaxLeng = this.range(XXX, YYY, game_W - 2 * this.getWidth(), game_H - 2 * this.getWidth());
            if (N < 0)
                N = game_W * game_H / (20 * this.getWidth() * this.getWidth());
        }
    }

    draw() {
        this.clearScreen();
        for (let i = 0; i < N; i++)
            if (this.gg[i].alive) {
                this.gg[i].update();
                this.gg[i].draw();
            }

        this.context.beginPath();
        this.context.strokeStyle  = "#FF0000";
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
        this.context.drawImage(dolarIM, this.getWidth() / 2, this.getWidth() / 2, this.getWidth(), this.getWidth());
        this.context.fillStyle = "red";
        if (this.score > tager)
            this.context.fillStyle = "#FF6600";
        this.context.font = this.getWidth() + 'px Stencil';
        this.context.fillText(this.score, this.getWidth() * 1.5, this.getWidth() * 1.35);

        this.context.drawImage(targetIM, this.getWidth() / 2, this.getWidth() / 2 + this.getWidth(), this.getWidth(), this.getWidth());
        this.context.fillStyle = "#FF6600";
        this.context.font = this.getWidth() + 'px Stencil';
        this.context.fillText(tager, this.getWidth() * 1.5, this.getWidth() * 2.35);

        this.context.drawImage(levelIM, game_W - 3 * this.getWidth(), this.getWidth() / 2, this.getWidth(), this.getWidth());
        this.context.fillStyle = "#FFFFCC";
        this.context.font = this.getWidth() + 'px Stencil';
        this.context.fillText(level + 1, game_W - 2 * this.getWidth(), this.getWidth() * 1.35);

        this.context.drawImage(clockIM, game_W - 3 * this.getWidth(), this.getWidth() / 2 + this.getWidth(), this.getWidth(), this.getWidth());
        this.context.fillStyle = "#FF00FF";
        this.context.font = this.getWidth() + 'px Stencil';
        this.context.fillText(Math.floor(time), game_W - 2 * this.getWidth(), this.getWidth() * 2.35);

        if (Math.abs(timeH - time) <= 0.7) {
            this.context.fillStyle = "red";
            this.context.fillText("+" + vlH, XXX, YYY * 0.8);
        }
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
        this.gg = [];
        for (let i = 0; i < N; i++)
            this.gg[i] = new gold(this);
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

new game();