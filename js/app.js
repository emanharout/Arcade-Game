// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x += this.speed * dt;
    this.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset enemy location upon reaching endpoint
Enemy.prototype.reset = function() {
    if (this.x >= 500) {
        this.x = -101;
        this.speed = randomInt(150,425);
    }
};

// The following prototype functions store enemy dimensions
Enemy.prototype.leftSide = function() {
	return this.x;
};
Enemy.prototype.rightSide = function() {
	return this.x + 101;
};
Enemy.prototype.topSide = function() {
	return this.y + 77;
};
Enemy.prototype.bottomSide = function() {
	return this.y + 144;
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};
Player.prototype.update = function() {
    if (this.collide()) {
        this.reset();
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.reset = function () {
    this.x = 202;
    this.y = 390;
};
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x !== borders.leftWall) {
        this.x -= 101;
    }
    if (direction === 'right' && this.x !== borders.rightWall) {
        this.x += 101;
    }
    if (direction === 'up' && this.y !== borders.topWall) {
        this.y -= 85;
    } else if (direction === 'up' && this.y === 50) {
        this.reset();
        //TODO: getPoints function
    }
    if (direction == 'down' && this.y !== borders.bottomWall) {
        this.y += 85;
    }
};
// The following prototype functions store enemy dimensions
Player.prototype.leftSide = function() {
	return this.x + 31;
};
Player.prototype.rightSide = function() {
	return this.x + 84;
};
Player.prototype.topSide = function() {
	return this.y + 80;
};
Player.prototype.bottomSide = function() {
	return this.y + 140;
};


//Detect collision, returns boolean
Player.prototype.collide = function () {
	for (i = 0; i < allEnemies.length; i++) {
		if (this.leftSide() < allEnemies[i].rightSide() && this.rightSide() > allEnemies[i].leftSide() && this.topSide() < allEnemies[i].bottomSide() && this.bottomSide() > allEnemies[i].topSide()) {
			return true;
		}
	}
};

var borders = {
    leftWall: 0,
    rightWall: 404,
    bottomWall: 390,
    topWall: 50
};

// TODO: If player.y = 50, and move up once more, reset
// TODO: Collission:
// If player occupies same space as enemy, reset game

// Now instantiate your objects.
var enemy1 = new Enemy(-101, 55, randomInt(150, 425));
var enemy2 = new Enemy(-101, 140, randomInt(150, 425));
var enemy3 = new Enemy(-101, 225, randomInt(150, 425));

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
// Place the player object in a variable called player
var player = new Player(202, 390);

//Make random number
function randomInt (min, max) {
    return Math.floor(Math.random() * max) + min;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
