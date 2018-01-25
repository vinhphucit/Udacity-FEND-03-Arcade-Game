// Enemies our player must avoid

class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x, y, sprite = 'images/enemy-bug.png') {

        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = Math.floor((Math.random() * 5) + 1);;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed;
        if (this.x >= 505) {
            this.speed = Math.floor((Math.random() * 5) + 1);;
            this.x = 0;
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    //The constructor of Player with default avatar and position
    constructor(sprite = 'images/char-boy.png', x = 101 * 2, y = 400) {
        this.VERTICAL_STEP = 83;
        this.HORIZONTAL_STEP = 101;

        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }


    // check if game is over
    update() {
        allEnemies.forEach(enemy => {
            if (Math.abs(this.x - enemy.x)<70) {
                if (this.y >= enemy.y - 25 && this.y <= enemy.y + 25) {
                    this.resetGame();
                }
            }
        });


    }

    // render the image on game screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // event on win game
    onWinGame() {        
        setTimeout(() => {
            alert('you win')
            this.resetGame();
        }, 500);
    }

    //reset the game
    resetGame() {
        this.x = 101 * 2;
        this.y = 400;
        allEnemies.forEach(enemy => {
            enemy.x = 0;
        });
    }


    //handle the input key
    handleInput(keyCode) {
        if (this.y < 0) return;
        switch (keyCode) {
            case 'left':
                if (this.x >= this.HORIZONTAL_STEP)
                    this.x -= this.HORIZONTAL_STEP;
                break;
            case 'up':
                if (this.y >= 0) {
                    this.y -= this.VERTICAL_STEP;
                    if (this.y < 0) {
                        this.onWinGame();
                    }
                }
                break;
            case 'right':
                if (this.x < 101 * 2 + this.HORIZONTAL_STEP * 2)
                    this.x += this.HORIZONTAL_STEP;
                break;
            case 'down':
                if (this.y <= 400 - this.VERTICAL_STEP)
                    this.y += this.VERTICAL_STEP;
                break;
        }
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [new Enemy(0, 400 - 83 * 4), new Enemy(0, 400 - 83 * 3), new Enemy(0, 400 - 83 * 2)]
let player = new Player()

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
