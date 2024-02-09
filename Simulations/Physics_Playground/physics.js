const screen = document.getElementById("screen")
const pen = screen.getContext("2d")
let width = window.innerWidth;
let height = window.innerHeight;

screen.height = height;
screen.width = width;


class Circle {
    constructor(context, width, height, x, y, xdir) {
        this.pen = context
        this.velocityX = xdir;
        this.velocityY = 0;
        this.speed = 5;

        this.height = height;
        this.width = width;

        this.x = x
        this.y = y

        this.radius = 40
    }

    draw () {
        this.pen.lineWidth = 10;
        this.pen.beginPath();
        this.pen.arc(this.x, this.y, this.radius, 0, Math.PI*2)
        this.pen.stroke();
    }

    move () {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    remove() {
        if (this.x > this.width + 200 || this.x < -200) {
            circList.shift();
        } else if (this.y > this.height + 200 || this.y < -200) {
            circList.shift();
        }
    }

    checkCollision () {
        for (let index = 0; index < line.points.length-1; index++) {
            let point = line.points[index]
            let distance = Math.sqrt((point[0] - this.x)*(point[0] - this.x)+(point[1] - this.y)*(point[1] - this.y))
            if (distance <= this.radius-5) {
                this.collide(point);
            }
        }
    }

    collide(point) {
        let collisionVector = {x: point[0] - this.x, y: point[1] - this.y};
        let distance = Math.sqrt((point[0]-this.x)*(point[0]-this.x) + (point[1]-this.y)*(point[1]-this.y));
        let normalVector = {x: collisionVector.x / distance, y: collisionVector.y / distance};
        let relativeVelocity = {x: this.velocityX, y: this.velocityY};
        let speed = relativeVelocity.x * normalVector.x + relativeVelocity.y * normalVector.y;
        speed = 3

        this.velocityX = speed * -normalVector.x;
        this.velocityY = speed * -normalVector.y;
    }

    update() {
        this.draw();
        this.move();
        this.checkCollision();
        //this.remove();
    }
}

class Line {
    constructor(context, width, height) {
        this.pen = context;

        this.width = width;
        this.height = height

        this.startPoint = [this.width - 400, this.height - 400]
        this.endPoint = [this.width/2, this.height/2 + 50]
        this.length = Math.floor(Math.sqrt((this.startPoint[0] - this.endPoint[0])**2 + (this.startPoint[1] - this.endPoint[1])**2))
        this.points = [];
        this.getPoints();

    }

    draw () {
        this.pen.lineWidth = 10;
        this.pen.beginPath();
        this.pen.moveTo(this.startPoint[0], this.startPoint[1]);
        this.pen.lineTo(this.endPoint[0], this.endPoint[1]);
        this.pen.stroke();
    }

    drawPoints() {
        for (let index = 0; index < this.points.length; index++) {
            this.pen.beginPath();
            this.pen.arc(this.points[index][0], this.points[index][1], 1, 0, Math.PI*2)
            this.pen.stroke();
        }
    }

    getPoints() {
        this.points = [];
        let incrementX = (this.startPoint[0] - this.endPoint[0]) / this.length;
        let incrementY = (this.startPoint[1] - this.endPoint[1]) / this.length;
        for (let index = 0; index < this.length; index ++) {
            this.points.push([this.startPoint[0] - (index*incrementX), this.startPoint[1] - (index*incrementY)])
        }
    }

    update() {
        //this.draw();
        this.getPoints();
        this.drawPoints();

        this.rise = this.startPoint[1] - this.endPoint[1];
        this.run = this.startPoint[0] - this.endPoint[0];
    }
}

let circList = [];
//circList.push(new Circle(pen, width, height))
let line = new Line(pen, width, height, 50, height/2, 1);

screen.onmousemove = function (event) {
    line.startPoint[0] = event.offsetX;
    line.startPoint[1] = event.offsetY;
}
screen.onmousedown = function () {
    circList.push(new Circle(pen, width, height, 0, height/2, 2))
    circList.push(new Circle(pen, width, height, width, height/2, -2))
    //console.log(circList.length)
}

function running () {
    pen.clearRect(0,0,width,height);
    pen.beginPath();

    line.update();

    if (circList.length > 0) {
        for (let index = 0; index < circList.length; index++) {
            circList[index].update()
        }
    }
    requestAnimationFrame(running);
}

running()

