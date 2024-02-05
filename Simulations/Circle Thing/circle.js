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
        this.colors = ["red", "blue", "green", "white", "orange", "pink", "black", "yellow"]

        this.outerRadius = width / 5;
        this.outerX = width / 2;
        this.outerY = height / 2;
        this.outerTop = this.outerY - this.outerRadius;
        this.outerBottom = this.outerY + this.outerRadius;

        this.innerRadius = this.outerRadius / 10;
        this.innerX = width / 2;
        this.innerY = height / 2
        this.innerDirectionY = 1;
        this.innerDirectionX = 0;
        this.innerSpeed = 5;
        this.innerColor = "red";
        this.innerColorIndex = 0;

        console.log("created circle thing")
    }

    // Draws the outer circle___________________________________________________________________________________________
    createOuterCircle() {
        this.pen.lineWidth = 5;
        let section = Math.PI * 2 / 16;

        let color = "black"

        for (let index = 0; index < 16; index++) {
            this.pen.beginPath();
            if (color === "black"){color = "red"}
            else {color = "black"}
            this.pen.strokeStyle = color;
            this.pen.arc(this.outerX, this.outerY, this.outerRadius, section * index, section * (index + 1) );
            this.pen.stroke();
        }
    }

    // Draws the inner circle___________________________________________________________________________________________
    createInnerCircle() {
        this.pen.lineWidth = 10;
        this.pen.beginPath();
        this.pen.strokeStyle = "black"
        this.pen.fillStyle = this.innerColor
        this.pen.arc(this.innerX, this.innerY, this.innerRadius, 0, Math.PI * 2);
        this.pen.stroke();
        this.pen.fill();
    }

    // Checks for collision between the outer nd inner circles__________________________________________________________
    checkCollision() {
        if (this.innerY + this.innerRadius > this.outerBottom) {
            this.innerDirectionY = -1;
            this.innerRadius+= 1
            this.changeColor()
        } else if (this.innerY - this.innerRadius < this.outerTop) {
            this.innerDirectionY = 1;
            this.innerRadius += 1
            this.changeColor()
        }
    }

    // Loops through an array of colors_________________________________________________________________________________
    changeColor() {
        if (this.innerColor === this.colors[this.colors.length - 1]) {
            this.innerColor = this.colors[0]
            this.innerColorIndex = 0;
        } else {
            this.innerColor = this.colors[this.innerColorIndex += 1]
        }
    }

    // The main loop that makes changes and updates everything or every frame___________________________________________
    update() {
        this.checkCollision()
        this.pen.clearRect(0, 0, width, height);
        this.innerY += this.innerSpeed * this.innerDirectionY;
        this.innerX += 0.5 * this.innerDirectionX;
        this.createInnerCircle();
        this.createOuterCircle();
    }
}

// Create the simulation object
let circ = new circleThing(pen);

// Animation loop to run the simulation
function running() {
    circ.update();
    requestAnimationFrame(running);
}

running();