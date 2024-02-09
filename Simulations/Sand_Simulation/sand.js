// Set up canvas________________________________________________________________________________________________________
let screen = document.getElementById("screen");
let sizeSlider = document.getElementById("slider")
let sizeText = document.getElementById("slider_text")
let pen = screen.getContext("2d");
let width  = window.innerWidth - 15;
let height  = window.innerHeight - 20;
screen.width = width;
screen.height = height;

getSandSize();
setSandSize();
sizeSlider.oninput = setSandSize

const tileSize = parseInt(sizeSlider.value); // The size of each piece of sand
const rowCount = Math.floor(height / tileSize);
const colCount = Math.floor(width / tileSize);

let sand = []; // Empty array to hold sand

let mouseHeld = false;
let mouseX = 0;
let mouseY = 0;

let sandCoolDown = new Date().getTime();
let sandCoolDownMilliseconds = 50;
let sandCanDrop = true;

let hue = 240;

function getSandSize() {
    if (localStorage.getItem("sandSize") === null){
        localStorage.setItem("sandSize", "8");
    }
    sizeSlider.value = localStorage.getItem("sandSize");
}

function setSandSize() {
    sizeText.innerHTML = "Sand Pixel Size: " + sizeSlider.value;
    localStorage.setItem("sandSize", sizeSlider.value);
}

// Draw a gird on the screen____________________________________________________________________________________________
function drawGrid(){
    for (let row = 0; row < rowCount; row++){
        for (let col = 0; col < colCount; col++){
            pen.beginPath();
            pen.rect(col * tileSize, row * tileSize, tileSize, tileSize)
            pen.stroke();
        }
    }
}

// Add a sand tile to an array__________________________________________________________________________________________
function addSand(){
    for (let num = 0; num < 4; num++) {
        let posX = sandShower(mouseX);
        let posY = sandShower(mouseY);
        let sandX = Math.floor(posX / tileSize) * tileSize;
        let sandY = Math.floor(posY / tileSize) * tileSize;
        sand.push([sandX, sandY, tileSize, tileSize, 1, 0])
    }
}

// Draw all sand________________________________________________________________________________________________________
function drawSand(){
    updateColor()
    for (let index = 0; index < sand.length; index++) {
        let data = sand[index];
        let speed;
        if (data[5] < 100){speed = sandSpeed(data)}
        else {speed = 0}
        //pen.fillStyle = "hsl(" + hue + ", 80%, 50%)";
        pen.fillStyle = "#96811c"
        pen.fillRect(data[0], data[1] += speed, data[2], data[3])
        pen.stroke()
    }
}

function updateColor() {
    hue++
    if (hue > 360) {
        hue = 0
    }
}

// Sets the sands movement speed________________________________________________________________________________________
function sandSpeed(data){
    data[5] += .1;
    let move = checkBelow(data);
    if (move ===  false) {
        return 0
    } else if (move === "down"){
        data[4] += 0
        return Math.floor(data[4]) * tileSize
    } else if (move === "right") {
        data[4] += 0
        data[0] += tileSize
        return Math.floor(data[4]) * tileSize
    } else if (move === "left") {
        data[4] += 0
        data[0] -= tileSize
        return Math.floor(data[4]) * tileSize
    }
}

// Checks the tile below the current sand_______________________________________________________________________________
function checkBelow(data){
    if (data[1] + tileSize === rowCount * tileSize){
        return false
    }
    for (let index = 0; index < sand.length; index++){
        let tile = sand[index];
        if (data[1] + tileSize === tile[1] && data[0] === tile[0]){
            return checkSides(data);
        }
    }
    return "down";
}

// If the spot directly below is unavailable check down and to the side_________________________________________________
function checkSides(data){
    // track which sides are blocked, right / left
    let blockedSides = [false, false]

    for (let index = 0; index < sand.length; index++) {
        let tile = sand[index];

        // Right side taken
        if ((data[1] + tileSize === tile[1] && data[0] + tileSize === tile[0])) {
            blockedSides[0] = true;

        // Left side taken
        } else if ((data[1] + tileSize === tile[1] && data[0] - tileSize === tile[0])) {
            blockedSides[1] = true;

        // Right wall
        } else if (data[0] + tileSize >= width){
            blockedSides[0] = true;

        // Left wall
        } else if (data[0] - tileSize < 0){
            blockedSides[1] = true;
        }
    }
    if (blockedSides[0] === true && blockedSides[1] === true){
        return false;
    } else if (blockedSides[0] === true){
        return "left";
    } else if (blockedSides[1] === true){
        return "right";
    } else {
        let choice = Math.random();
        if (choice <= .5){
            return "left";
        } else if (choice > .5){
            return "right";
        }
    }
}

// Makes many sand pieces spawn around the players click point__________________________________________________________
function sandShower(mousePos){
    let randPos = Math.floor(Math.random() * 10) - 5
    if (randPos < 0) {
        randPos += 3;
    } else if (randPos > 0) {
        randPos -= 3;
    }
    return (randPos * tileSize) + mousePos
}

// Cool down for dropping sand__________________________________________________________________________________________
function dropCoolDown() {
    if (new Date().getTime() - sandCoolDown > sandCoolDownMilliseconds) {
        sandCoolDown = new Date().getTime();
        sandCanDrop = true;
    }
}

// Checks for users input_______________________________________________________________________________________________
function userInput(){
    screen.onmousedown = function(event) {
        mouseHeld = true
        mouseX = event.offsetX;
        mouseY = event.offsetY;
        screen.onmousemove = function (event) {
            mouseX = event.offsetX;
            mouseY = event.offsetY;
        }
    }
    screen.onmouseup = function() {mouseHeld = false}

    if (mouseHeld === true && sandCanDrop === true){
        sandCanDrop = false;
        addSand();
    }
}

// The main program loop________________________________________________________________________________________________
function running(){
    pen.beginPath()
    pen.clearRect(0, 0, width, height); // Clear the screen
    userInput()
    drawSand(); // Draws the sand the player places
    //drawGrid(); // Draw the grid on the screen

    dropCoolDown();

    requestAnimationFrame(running)
}

running()