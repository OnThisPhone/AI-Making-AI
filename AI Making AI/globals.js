var winW = window.innerWidth;
var winH = window.innerHeight;

const levelData = [
    100, 0, 100, 200,
    100, 200, 200, 200];

//Basic variables and classes
class Guy {
    constructor(w, h, x, y, col, speed) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        
        this.col = col;
        this.speed = speed;

        this.leftPressed = false;
    }

    draw() {
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    move() {
        //console.log("asdasdasd" + this.leftPressed);
        if(this.leftPressed)
            this.x -= this.speed;
        if(this.rightPressed)
            this.x += this.speed;
        if(this.upPressed)
            this.y -= this.speed;
        if(this.downPressed)
            this.y += this.speed;
    }
}

var player = new Guy(15, 15, 0, 0, "#ff0000", 4);
var anEnemy = new Guy(15, 15, 120, 120, "#ffff00", 4);
var map = new Map("LineWorld", levelData);