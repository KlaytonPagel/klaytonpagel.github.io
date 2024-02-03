// Set up canvas________________________________________________________________________________________________________
screen = document.getElementById("screen");
pen = screen.getContext("2d");
let width  = window.innerWidth - 15;
let height  = window.innerHeight - 20;
screen.width = width;
screen.height = height;

const tileSize = 8; // The size of each piece of sand
const rowCount = Math.floor(height / tileSize);
const colCount = Math.floor(width / tileSize);

let sand = []; // Empty array to hold sand

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

// Draw screen boundary_________________________________________________________________________________________________
function drawBoundary(){
    // Draw lines around the boundary of the canvas
    pen.moveTo(0,0);
    pen.lineTo(width, 0);
    pen.lineTo(width, height);
    pen.lineTo(0, height);
    pen.lineTo(0, 0);
    pen.stroke();

}

// Add a sand tile to an array__________________________________________________________________________________________
function addSand(event){
    mouseX = event.offsetX;
    mouseY = event.offsetY;
    let sandX = Math.floor(mouseX / tileSize) * tileSize;
    let sandY = Math.floor(mouseY / tileSize) * tileSize;
    sand.push([sandX, sandY, tileSize, tileSize, 1, false])
}

// Draw all sand________________________________________________________________________________________________________
function drawSand(){
    for (let index = 0; index < sand.length; index++) {
        let data = sand[index];
        let speed = sandSpeed(data)
        pen.fillRect(data[0], data[1] += speed, data[2], data[3])
        pen.stroke()
    }
}

// Sets the sands movement speed________________________________________________________________________________________
function sandSpeed(data){
    // if the sand has reached it's final spot don't check if it can move
    if (data[5] === true){
        return 0;
    }
    let move = checkBelow(data);
    if (move ===  false) {
        data[5] = true;
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

// Checks for users input_______________________________________________________________________________________________
function userInput(){
    screen.onmousedown = addSand
}

// The main program loop________________________________________________________________________________________________
function running(){
    pen.beginPath()
    pen.clearRect(0, 0, width, height); // Clear the screen
    userInput()
    drawSand(); // Draws the sand the player places
    drawBoundary();// Draw a boundary around canvas
    //drawGrid(); // Draw the grid on the screen

    // setTimeout(() => {requestAnimationFrame(running) }, 1000/60)
    requestAnimationFrame(running)
}

running()