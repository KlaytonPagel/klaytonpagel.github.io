const screenWidth = 700
const screenHeight = 500

document.body.style.width = screenWidth + "px"
document.body.style.height = screenHeight + "px"

const width = 100
const height = 50

const bigA = document.getElementById("bigA")

bigA.style.width = width + "px"
bigA.style.height = height + "px"

class BigA {
    constructor() {
        this.directionX = -1;
        this.directionY = 1;
        this.top = 0;
        this.left = 0;
    }

    move () {
        this.top += this.directionY
        this.left += this.directionX

        bigA.style.top = this.top + "px"
        bigA.style.left = this.left + "px"
    }

    checkDirection () {
        if ((this.top + height > screenHeight) || (this.top < 0)) {
            this.directionY *= -1
        }
        if ((this.left + width > screenWidth) || (this.left < 0)) {
            this.directionX *= -1
        }
    }

    run () {
        this.checkDirection()
        this.move()
    }
}

big = new BigA()

function running () {
    big.run()
    requestAnimationFrame(running)
}
running()