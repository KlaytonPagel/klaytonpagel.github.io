const screen = document.getElementById("screen");
const pen = screen.getContext("2d");
let width = window.innerWidth - 20;
let height = window.innerHeight - 20;
screen.width = width;
screen.height = height;


// Class to run and build the whole simulation__________________________________________________________________________
class circleThing {

    // Constructor to initialize all variables and values______________________________________________________________
    constructor(pen) {
        this.pen = pen;
        this.hue = 0;

        this.outerRadius = width / 2;
        this.outerX = width / 2;
        this.outerY = height / 2;
        this.outerPoints = [];
        this.getOuterSize();
        this.findOuterPoints();

        this.innerRadius = this.outerRadius / 10;
        this.innerX = width / 2 - this.outerRadius / 1.5;
        this.innerY = height / 2
        this.velocityX = 0;
        this.velocityY = 1;
        this.speed = 5
        this.innerPoints = [];
        this.previousPoints = [];

        this.currentVelocity = 0;

        this.collisions = 0;

        this.audioFiles = [
            "Audio/Note1.wav",
            "Audio/Note2.wav",
            "Audio/Note3.wav",
            "Audio/Note4.wav",
            "Audio/Note5.wav",
            "Audio/Note6.wav",
            "Audio/Note7.wav",
            "Audio/Note8.wav",
            "Audio/Note9.wav",
            "Audio/Note10.wav",
            "Audio/Note11.wav",
            "Audio/Note12.wav",
        ]

        this.currentAudio = 0

        console.log("created circle thing")


    }

    // Sets the size of the outer circle based on the smallest axis_____________________________________________________
    getOuterSize() {
        if (width < height){
            this.outerRadius =  width / 2;
        } else {
            this.outerRadius = height / 2;
        }
    }

    // Draws the outer circle___________________________________________________________________________________________
    drawOuterCircle() {
        this.pen.lineWidth = 5;
        this.pen.beginPath()
        this.pen.arc(this.outerX, this.outerY, this.outerRadius, 0 , Math.PI*2);
        this.pen.stroke();
    }

    // Finds all points for the outer circle____________________________________________________________________________
    findOuterPoints() {
        this.pen.lineWidth = 10;

        // Bottom half
        for (let x = this.outerX - this.outerRadius; x <= this.outerX + this.outerRadius; x += 10){
            let y = Math.sqrt((this.outerRadius + x - this.outerX)*(this.outerRadius - x + this.outerX)) + this.outerY
            this.outerPoints.push([x, y])
        }
        // Top half
        for (let x = this.outerX - this.outerRadius; x <= this.outerX + this.outerRadius; x += 10){
            let y = -Math.sqrt((this.outerRadius + x - this.outerX)*(this.outerRadius - x + this.outerX)) + this.outerY
            this.outerPoints.push([x, y])
        }
        // Right half
        for (let y = this.outerY - this.outerRadius; y <= this.outerY + this.outerRadius; y += 10){
            let x = Math.sqrt((this.outerRadius + y - this.outerY)*(this.outerRadius - y + this.outerY)) + this.outerX
            this.outerPoints.push([x, y])
        }
        // Left half
        for (let y = this.outerY - this.outerRadius; y <= this.outerY + this.outerRadius; y += 10){
            let x = -Math.sqrt((this.outerRadius + y - this.outerY)*(this.outerRadius - y + this.outerY)) + this.outerX
            this.outerPoints.push([x, y])
        }
    }

    // Draws the inner circle___________________________________________________________________________________________
    drawInnerCircle() {
        this.pen.lineWidth = 10;
        this.pen.beginPath();
        this.pen.strokeStyle = "black"
        this.pen.fillStyle = "hsl(" + this.hue + ", 100%, 50%)";

        // Draw past circle positions
        for (let index = 0; index < this.previousPoints.length; index++) {
            this.pen.beginPath();
            this.pen.arc(this.previousPoints[index][0], this.previousPoints[index][1], this.innerRadius, 0, Math.PI * 2)
            this.pen.fill();
            this.pen.stroke();
        }

        // Draw current circle position
        this.pen.arc(this.innerX, this.innerY, this.innerRadius, 0, Math.PI * 2);
        this.pen.stroke();
        this.pen.fill();
    }

    // Find points on the inner circle__________________________________________________________________________________
    findInnerPoints() {
        this.innerPoints = [];

        // Bottom half
        for (let x = this.innerX - this.innerRadius; x <= this.innerX + this.innerRadius; x += 5){
            let y = Math.sqrt((this.innerRadius + x - this.innerX)*(this.innerRadius - x + this.innerX)) + this.innerY
            this.innerPoints.push([x, y])
        }
        // Top half
        for (let x = this.innerX - this.innerRadius; x <= this.innerX + this.innerRadius; x += 5){
            let y = -Math.sqrt((this.innerRadius + x - this.innerX)*(this.innerRadius - x + this.innerX)) + this.innerY
            this.innerPoints.push([x, y])
        }
        // Right half
        for (let y = this.innerY - this.innerRadius; y <= this.innerY + this.innerRadius; y += 5){
            let x = Math.sqrt((this.innerRadius + y - this.innerY)*(this.innerRadius - y + this.innerY)) + this.innerX
            this.innerPoints.push([x, y])
        }
        // Left half
        for (let y = this.innerY - this.innerRadius; y <= this.innerY + this.innerRadius; y += 5){
            let x = -Math.sqrt((this.innerRadius + y - this.innerY)*(this.innerRadius - y + this.innerY)) + this.innerX
            this.innerPoints.push([x, y])
        }
    }

    // Checks for collision between the outer and inner circles_________________________________________________________
    checkCollision() {
        for (let outerIndex = 0; outerIndex < this.outerPoints.length; outerIndex ++) {
            let point = this.outerPoints[outerIndex];
            let distance = Math.sqrt((point[0]-this.innerX)*(point[0]-this.innerX) + (point[1]-this.innerY)*(point[1]-this.innerY))
            if (distance <= this.innerRadius){
                this.collide(point);
            }
        }
    }

    // Changes made when the ball collides______________________________________________________________________________
    collide(point) {
        let collisionVector = {x: point[0] - this.innerX, y: point[1] - this.innerY};
        let distance = Math.sqrt((point[0]-this.innerX)*(point[0]-this.innerX)+(point[1]-this.innerY)*(point[1]-this.innerY));
        let normalVector = {x: collisionVector.x / distance, y: collisionVector.y / distance};
        this.velocityX = this.speed * -normalVector.x;
        this.velocityY = this.speed * -normalVector.y;

        this.hue += 1 // Change the color of the circle
        this.currentVelocity = 0; // reset gravity
        this.innerRadius += .5;
        this.speed += .5;

        // set the position to the circles last position
        this.innerX = this.previousPoints[this.previousPoints.length - 1][0]
        this.innerY = this.previousPoints[this.previousPoints.length - 1][1]

        this.collisions ++

        new Audio(this.audioFiles[this.currentAudio]).play();
        this.updateAudio();
    }

    updateAudio() {
        this.currentAudio++;
        if (this.currentAudio > this.audioFiles.length -1){
            this.currentAudio = 0;
        }
    }

    move() {
        this.checkCollision();
        this.previousPoints.push([this.innerX, this.innerY]);
        this.innerY += this.velocityY + this.currentVelocity;
        this.innerX += this.velocityX;

        this.currentVelocity += .2; // Increase the effect of gravity
    }

    // The main loop that makes changes and updates everything or every frame___________________________________________
    update() {
        this.pen.clearRect(0, 0, width, height);

        this.move();

        this.drawInnerCircle();
        this.drawOuterCircle();

        this.findInnerPoints();

        if (this.previousPoints.length > 20){
            this.previousPoints.shift();
        }

        this.debug(this.collisions)
    }

    // Display the provided information as text on screen_______________________________________________________________
    debug(text) {
        this.pen.beginPath()
        this.pen.font = "50px Arial"
        this.pen.fillText(text,50, 50)
        this.pen.stroke()
    }
}

// Create the simulation object
let circ = new circleThing(pen);

// Animation loop to run the simulation
function running() {
    circ.update();
    setTimeout(() => requestAnimationFrame(running), 1000/60)
    //requestAnimationFrame(running);
}

running();