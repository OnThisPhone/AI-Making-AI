/**
 * Whole project needs a bunch of cleaning up and some rewrite. But it works, so fuck it!
 * 
 */
//Some standard game stuff
var canvas;
var ctx;

canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');


const fps = 60;
const interval = 1000 / fps;
let plotInterval = 60;
let then = Date.now();


//Basic "game stuff"
function draw() {
    // Your drawing code goes here
    //console.log("DRAWING!!!");

    //Clear rect with each frame.
    ctx.fillStyle = "#222";
    ctx.fillRect(0,0, winW, winH);

    //showAIMap();
    showAIPath();

    player.draw();
    anEnemy.draw();
    map.draw();
}

function update() {
    // Your update code goes here

    player.move();
}

function loop() {
    requestAnimationFrame(loop);
    let now = Date.now();
    let delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);

        update();
        draw();

        //Could be further optimized by putting it in a different thread and controlling for the fact that it might be slow sometimes.
        //Also, if both entities are still.
        /*--plotInterval;
        if(plotInterval <= 0){
            plotPath();
            plotInterval = fps*1;//For demonstration purposes, this could be 4. In a real world example, you could easily do it once every two seconds. Or maybe even slower.
        }*/
    }

    
}
function init(){

    var bucoR = document.querySelector(".buttonContainer").getClientRects();
    winH -= bucoR[0].height;
    ctx.canvas.width = winW;
    ctx.canvas.height = winH;

    console.log("Line Array:");
    //var test = lineTo2DArray(100, 0, 100, 200, AIworldWidth, AIworldHeight);
    //console.log(test);
    //terrainMap = combineArrays(AIMap, test);

    //AIMap = MakeMapAIMap();
    //AIMap = Array.from({ length: 40 }, () => Array.from({ length: 40 }, () => 0));
    //terrainMap = Array.from({ length: 40 }, () => Array.from({ length: 40 }, () => 0));
    
    /*AIMap = combineArrays(AIMap, test);
    terrainMap = combineArrays(terrainMap, test);*/

    map.randomizeData(20, winW, winH);

    //map.data = [29,109,29,159];
    map.load();

    doSomethingAsync();

    //initDirectionButtons();

    /*var buco = document.querySelector(".buttonContainer");
    var bucoR = document.querySelector(".buttonContainer").getClientRects();
    //buco.style.marginTop = -50 + "px";
    console.log(bucoR[0].height);*/
}

window.addEventListener("load",function(){
    init();
    loop();//Probably doesn't need to be here, but it is anyway. For neatness.
});


//

//For keyboard
function keyDownHandler(event) {
    if (event.key == "Left" || event.key == "ArrowLeft") {
        player.leftPressed = true;
    } if (event.key == "Right" || event.key == "ArrowRight") {
        player.rightPressed = true;
    } if (event.key == "Up" || event.key == "ArrowUp") {
        player.upPressed = true;
    } if (event.key == "Down" || event.key == "ArrowDown") {
        player.downPressed = true;
    }
}
function keyUpHandler(event) {
    if (event.key == "Left" || event.key == "ArrowLeft") {
        player.leftPressed = false;
    } if (event.key == "Right" || event.key == "ArrowRight") {
        player.rightPressed = false;
    } if (event.key == "Up" || event.key == "ArrowUp") {
        player.upPressed = false;
    } if (event.key == "Down" || event.key == "ArrowDown") {
        player.downPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Disable context menu
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

//Screen buttons
function initDirectionButtons(){
    const directions = document.querySelectorAll(".dir");
    let intervalId = null;

    //Left
    directions[0].addEventListener("mousedown", function(e){
        player.leftPressed = true;
    });
    directions[0].addEventListener("mouseup", function(e){
        player.leftPressed = false;
    });
    directions[0].addEventListener("touchstart", function(e){
        //e.preventDefault();
        e.preventDefault();
        player.leftPressed = true;
        
    });
    directions[0].addEventListener("touchend", function(e){
        e.stopPropagation();
        player.leftPressed = false;
    });

    //Up
    directions[1].addEventListener("mousedown", function(e){
        player.upPressed = true;
    });
    directions[1].addEventListener("mouseup", function(e){
        player.upPressed = false;
    });
    directions[1].addEventListener("touchstart", function(e){
        //e.preventDefault();
        e.preventDefault();
        player.upPressed = true;
        
    });
    directions[1].addEventListener("touchend", function(e){
        e.stopPropagation();
        player.upPressed = false;
    });

    //Right
    directions[3].addEventListener("mousedown", function(e){
        player.rightPressed = true;
    });
    directions[3].addEventListener("mouseup", function(e){
        player.rightPressed = false;
    });
    directions[3].addEventListener("touchstart", function(e){
        //e.preventDefault();
        e.preventDefault();
        player.rightPressed = true;
        
    });
    directions[3].addEventListener("touchend", function(e){
        e.stopPropagation();
        player.rightPressed = false;
    });

    //Down
    directions[2].addEventListener("mousedown", function(e){
        player.downPressed = true;
    });
    directions[2].addEventListener("mouseup", function(e){
        player.downPressed = false;
    });
    directions[2].addEventListener("touchstart", function(e){
        //e.preventDefault();
        e.preventDefault();
        player.downPressed = true;
        
    });
    directions[2].addEventListener("touchend", function(e){
        e.stopPropagation();
        player.downPressed = false;
    });
}
