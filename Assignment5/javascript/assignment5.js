"use strict"; 
var fieldset = document.getElementsByTagName("fieldset");
var buttons = document.getElementsByClassName("button");
var time = 3000;
var score = 0;
var speedDivisor = 0;

var canvasX;
var canvasY;
var mySound = new sound("./sounds/Slap.mp3");

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 340;
fieldset[0].appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "./images/classRoom.jpeg";

// hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "./images/hand.png";

// monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "./images/Face.png";

// Game objects
var hero = {
	x: 0,
	y: 0
};
var monster = {
	x: 0,
	y: 0
};

// Handle mouse controls
if(canvas.addEventListener){
    canvas.addEventListener("mousemove", function(e) { 
        var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
        canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
        canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas
        hero.x = canvasX;
        hero.y = canvasY;
    });
} else if(canvas.attachEvent) {
    canvas.attachEvent("onmousemove", function(e) { 
        var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
        canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
        canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // (0,0) the top left of the canvas
        hero.x = canvasX;
        hero.y = canvasY;
    });
}

// Reset the game when the player catches a monster
var reset = function () {
	// Throw the monster somewhere on the screen randomly
    monsterImage.src = "./images/Face.png";

	monster.x = 50 + (Math.random() * (canvas.width - 100));
	monster.y = 39 + (Math.random() * (canvas.height - 80));
};

// Update game objects
var update = function () {
	// Are they touching?
	if (
		hero.x < (monster.x + 56)
		&& hero.x > (monster.x - 8)
		&& hero.y < (monster.y + 55)
		&& hero.y > (monster.y - 45)
	) {
		++score;
        ++speedDivisor;
        updateTime();
        mySound.play();

        clearInterval(hopping);
        monsterImage.src = "./images/FaceRed.png";
        setTimeout(reset, 200);
        hopping = setInterval("reset()", time);
	}
};

//increase speed
function updateTime(){
    time = time*(1-(0.1+0.25/speedDivisor))
}

//Reset speed
function resetSpeed(){
    time = 3000;
    speedDivisor = 0;
    console.log("ASDFASDFASF: "+ time);
    clearInterval(hopping);
    hopping = setInterval("reset()", time);
}

//Reset score
function resetScore(){
    score = 0;
    resetSpeed();
}

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

    if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, 32, 32);

};

// The main game loop
var main = function () {
	render();

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
reset();
var hopping = setInterval("reset()", time);
main();

//Listeners
//new browsers (addEventListener)
if(canvas.addEventListener){
    //slap listner
    canvas.addEventListener("click", update, false); 
    //buttons listeners
    buttons[0].addEventListener("click", resetSpeed, false);
    buttons[1].addEventListener("click", resetScore, false);
    /*older browsers (attachEvent)*/
} else if(canvas.attachEvent) {
    //slap listner
    canvas.attachEvent("onclick", update, false);
    //buttons listeners
    buttons[0].attachEvent("onclick", resetSpeed, false);
    buttons[1].attachEvent("onclick", resetScore, false);
}