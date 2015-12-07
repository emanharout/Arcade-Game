// Gem class - our player strives to collect instances of these
var Gem = function (rowx, rowy, sprite) {
    this.sprite = sprite;
    this.x = rowx;
    this.y = rowy;
};

// Constantly checks if player collects gems by colliding with them
Gem.prototype.update = function() {
    this.collect();
};

// Draws various gem sprites
Gem.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Causes gems to reappear on map after a set time
Gem.prototype.spawn = function() {
    // self stores 'this' reference to gem objects since selfTimeout
    // causes 'this' to refer to window object
    var self = this;
    setTimeout(function() {self.setLocation();}, randomInt(2500, 7500));
};

// Positions gems randomly within rows/columns
Gem.prototype.setLocation = function() {
    this.x = 101 * randomInt(0, 4);
    this.y = 50 + (randomInt(0, 4) * 85);
};

// Remove gem off canvas
Gem.prototype.reset = function() {
    this.x = -100;
    this.y = -100;
};

// When player collects gem, the collision is detected, gem is
// removed from map temporarily, respawned, and score is increased.
Gem.prototype.collect = function() {
    // Detects collision between Gems and player
    if (this.sides('leftSide') < player.sides('rightSide') &&
    	this.sides('rightSide') > player.sides('leftSide') &&
    	this.sides('topSide') < player.sides('bottomSide') &&
    	this.sides('bottomSide') > player.sides('topSide')) {
        this.reset();
        this.spawn();
        // Increase score of Player(s) in a scalable way should multiplayer functionality
        // be added in the future
        for (i = 0; i < allPlayers.length; i++) {
            allPlayers[i].score = allPlayers[i].score + 2;
        }
    }
};

//Returns border dimensions for each side of gem
Gem.prototype.sides = function(side) {
    if (side === 'leftSide') {
        return this.x;
    }
    if (side === 'rightSide') {
        return this.x + 101;
    }
    if (side === 'topSide') {
        return this.y + 58;
    }
    if (side === 'bottomSide') {
        return this.y + 165;
    }
};

// Create instances of each gem and store into an array
var blueGem = new Gem(101 * randomInt(0, 4), 50 + (randomInt(0, 4) * 85), 'images/Gem-Blue.png');
var greenGem = new Gem(101 * randomInt(0, 4), 50 + (randomInt(0, 4) * 85), 'images/Gem-Green.png');
var orangeGem = new Gem(101 * randomInt(0, 4), 50 + (randomInt(0, 4) * 85), 'images/Gem-Orange.png');
var allGems = [blueGem, greenGem, orangeGem];

// Enemies our player must avoid
var Enemy = function (x, y, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
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
    this.x += this.speed * dt;
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
        this.speed = randomInt(250, 450);
    }
};

// The following prototype functions store enemy dimensions
Enemy.prototype.sides = function(side) {
    if (side === 'leftSide') {
        return this.x;
    }
    if (side === 'rightSide') {
        return this.x + 101;
    }
    if (side === 'topSide') {
        return this.y + 77;
    }
    if (side === 'bottomSide') {
        return this.y + 144;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.score = 0;
};

// Upon collision: player position is reset, score deducted
Player.prototype.update = function() {
    if (this.collide()) {
        this.reset();
        if (this.score >= 1){
            this.score = this.score - 1;
        }
    }
};

// Renders player, adds player score to top right corner of canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = "Bold 24px Helvetica";
    ctx.fillText("Score: " + this.score, 382, 35);
};

// Enables player movement based on key input
// Prevents moving off the map
Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x !== borders.leftWall) {
        this.x -= 101;
    }
    if (direction === 'right' && this.x !== borders.rightWall) {
        this.x += 101;
    }
    if (direction === 'up' && this.y !== borders.topWall) {
        this.y -= 85;
    // Increase score and resets position upon reaching water
    } else if (direction === 'up' && this.y === 50) {
        this.reset();
        this.score++;
    }
    if (direction == 'down' && this.y !== borders.bottomWall) {
        this.y += 85;
    }
};

// Contains canvas borders
var borders = {
    leftWall: 0,
    rightWall: 404,
    bottomWall: 390,
    topWall: 50
};

// The following prototype functions store player dimensions
Player.prototype.sides = function(side) {
    if (side === 'leftSide') {
        return this.x + 31;
    }
    if (side === 'rightSide') {
        return this.x + 84;
    }
    if (side === 'topSide') {
        return this.y + 80;
    }
    if (side === 'bottomSide') {
        return this.y + 140;
    }
};

// Detects collision, returns boolean value
Player.prototype.collide = function () {
	for (i = 0; i < allEnemies.length; i++) {
		if (this.sides('leftSide') < allEnemies[i].sides('rightSide') &&
			this.sides('rightSide') > allEnemies[i].sides('leftSide') &&
			this.sides('topSide') < allEnemies[i].sides('bottomSide') &&
			this.sides('bottomSide') > allEnemies[i].sides('topSide')) {
            return true;
		}
	}
};

// Reset player to start points
Player.prototype.reset = function () {
    this.x = 202;
    this.y = 390;
};

// Now instantiate your objects.
var enemy1 = new Enemy(-101, 55, randomInt(250, 450),'images/mutant-enemy-bug.png');
var enemy2 = new Enemy(-101, 140, randomInt(250, 450), 'images/enemy-bug.png');
var enemy3 = new Enemy(-101, 225, randomInt(250, 450), 'images/mutant-enemy-bug.png');

// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
// Place the player object in a variable called player
var player = new Player(202, 390);
var allPlayers = [];
allPlayers.push(player);

//Make random number
function randomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
