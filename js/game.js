let game_W = 20;
let game_H = 20;
let WW = 0;
const size = 3;
let II = size - 1, JJ = size - 1;
let xStart = -1, yStart = -1, xEnd = -1, yEnd = -1;
let xs = 0, ys = 0;
let win = false;
let delayEnd = 0;
let touch = 150;
var bg = new Image();
bg.src="images/background.jpg";

im = [];
var rd = Math.floor((Math.random() * 7) + 1);

for (var i = 0; i <= 9; i++) {
    im[i] = new Image();
    im[i].src="images/Data/" + rd + "/" + i + ".jpg";
}

var data = [[1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]];

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

        do {
            this.initMatrix();
        } while (this.checkWin());
        
        this.loop();

        this.listenKeyboard();
        this.listenTouch();
    }

    initMatrix() {
        for (var N = 0; N < 2 * size * size; N++) {
            var x1, x2, y1, y2;
            do {
                x1 = Math.floor(Math.random() * (size - 1));
                y1 = Math.floor(Math.random() * (size - 1));
            } while(x1 == size - 1 && y1 == size - 1);

            do {
                x2 = Math.floor(Math.random() * (size - 1));
                y2 = Math.floor(Math.random() * (size - 1));
            } while((x2 == size - 1 && y2 == size - 1) || (x2 == x1 && y2 == y1));

            var temp = data[x1][y1];
            data[x1][y1] = data[x2][y2];
            data[x2][y2] = temp;
        }
    }

    listenTouch() {
        document.addEventListener("touchmove", evt => {
            if (touch > 0)
                return;
            if (evt) evt = window.event;
            var x = evt.touches[0].pageX;
            var y = evt.touches[0].pageY;
            x -= (game_W - WW) / 2;
            y -= (game_H - WW) / 2;
            xEnd = xStart;
            yEnd = yStart;
            if (Math.abs(xs - x) > Math.abs(ys - y)) {
                if (x > xs) 
                    yEnd = yStart + 1;
                else
                    yEnd = yStart - 1;
            } else {
                if (y > ys) 
                    xEnd = xStart + 1;
                else
                    xEnd = xStart - 1;
            }
            if (xEnd == II || yEnd == JJ)
                this.solve();
        })

        document.addEventListener("touchstart", evt => {
            if (touch > 0)
                return;
            var x = evt.touches[0].pageX;
            var y = evt.touches[0].pageY;
            x -= (game_W - WW) / 2;
            y -= (game_H - WW) / 2;
            xs = x;
            ys = y;

            xStart = Math.floor(3 * y / WW);
            yStart = Math.floor(3 * x / WW);
        })
    }

    listenKeyboard() {
        document.addEventListener("keydown", key => {
            if (touch > 0)
                return;
            switch(key.keyCode) {
                case 37:
                    xEnd = II;
                    yEnd = JJ;
                    xStart = xEnd;
                    yStart = yEnd + 1;
                    break;
                case 38:
                    xEnd = II;
                    yEnd = JJ;
                    xStart = xEnd + 1;
                    yStart = yEnd;
                    break;
                case 39:
                    xEnd = II;
                    yEnd = JJ;
                    xStart = xEnd;
                    yStart = yEnd - 1;
                    break;
                case 40:
                    xEnd = II;
                    yEnd = JJ;
                    xStart = xEnd - 1;
                    yStart = yEnd;
                    break;
            }
            this.solve();
        })
    }

    solve() {
        if (Math.abs(xStart - xEnd) + Math.abs(yStart - yEnd) == 1 && this.checkXY(xStart, yStart) && this.checkXY(xEnd, yEnd)){
            if (II == xStart && xStart == xEnd  && (yStart - yEnd) * (yStart - JJ) >= 0) {
                if (JJ > yStart) {
                    for (var j = JJ; j > yStart; j--) {
                        data[II][j] = data[II][j - 1];
                    }
                } else {
                    for (var j = JJ; j < yStart; j++)
                        data[II][j] = data[II][j + 1];
                }
                data[xStart][yStart] = size * size;
                II = xStart;
                JJ = yStart;
            } else if (JJ == yStart && yStart == yEnd && (xStart - xEnd) * (xStart - II) >= 0){
                if (II > xStart) {
                    for (var i = II; i > xStart; i--)
                        data[i][JJ] = data[i - 1][JJ];
                } else {
                    for (var i = II; i < xStart; i++)
                        data[i][JJ] = data[i + 1][JJ];
                }
                data[xStart][yStart] = size * size;
                II = xStart;
                JJ = yStart;
            }
            
        }
    }


    checkXY(x, y) {
        if (x < 0 || x >= size || y < 0 || y >= size)
            return false;
        return true;
    }

    checkWin() {
        for (var i = 0; i < size; i++)
            for (var j = 0; j < size; j++)
                if (data[i][j] != i * size + j + 1)
                    return false;
        return true;
    }

    loop() {
        this.update();
        this.draw();
        this.messageWin();
        setTimeout(() => this.loop(), 30);
    }

    update() {
        if (win)
            return;
        this.render();
        touch--;
        console.log(touch);
    }

    messageWin() {
        if (this.checkWin()) {
            if (delayEnd++ > 50) {
                win = true;
                delayEnd = -1000000000;
                window.alert("You Win");
                location.reload();
            }
            touch  = 1000000000;
        }
        if (touch > 0)
            this.context.drawImage(im[0], (game_W - WW) / 2, (game_H - WW) / 2, WW, WW);
    }

    render() {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        game_W = this.canvas.width;
        game_H = this.canvas.height;
        WW = 0.7 * Math.min(game_W, game_H);
    }

    draw() {
        this.clearScreen();
        for (var  i = 0; i < 3; i++)
            for (var j = 0; j < 3; j++)
                if (data[i][j] != size * size) {
                    var y = i * WW / 3 + (game_H - WW) / 2;
                    var x = j * WW / 3 + (game_W - WW) / 2;
                    this.context.drawImage(im[data[i][j]], x, y, WW / 3, WW / 3);
                }
        for (var j = 0; j <= 3; j++) {
            var y = 0 * WW / 3 + (game_H - WW) / 2;
            var x = j * WW / 3 + (game_W - WW) / 2;
            
            this.context.beginPath();
            this.context.strokeStyle  = "#00FF00";
            this.context.lineWidth = 8;
            this.context.moveTo(x, y - 4);
            this.context.lineTo(x, y + WW + 4);
            this.context.stroke();

            y = 0 * WW / 3 + (game_W - WW) / 2;
            x = j * WW / 3 + (game_H - WW) / 2;
            this.context.beginPath();
            this.context.strokeStyle  = "#00FF00";
            this.context.lineWidth = 8;
            this.context.moveTo(y, x);
            this.context.lineTo(y + WW, x);
            this.context.stroke();
        }
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        if (bg.width / game_W < bg.height / game_H)
            this.context.drawImage(bg, 0, (bg.height - game_H * (bg.width / game_W)) / 2, bg.width, game_H * (bg.width / game_W), 0, 0, game_W, game_H);
        else
            this.context.drawImage(bg, (bg.width - game_W * (bg.height / game_H)) / 2, 0, game_W * (bg.height / game_H), bg.height, 0, 0, game_W, game_H);
    }
}

var g = new game();