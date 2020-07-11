class Game {
	constructor() {
		this.canvas = document.querySelector("#canvas");
		this.ctx = this.canvas.getContext("2d");
		this.player = new Player(this, this.canvas.width/2-50, this.canvas.height-300, 100, 100, 0, 3);
		this.firstPlatform = new Platform(this, this.canvas.width/2-50, this.canvas.height+80, 110,27); //first platform will be static and positioned underneath the player's starting position to ensure the player doesn't fall down as soon as the game starts
		this.platforms = []; //the rest of the platforms will be pushed into this array with dynamically set x and y values
		this.platformMaxX = this.canvas.width-this.firstPlatform.width; //the max x value that the platform can be positioned (the width of the canvas minus the width of the platform)
		this.platformY = canvas.height;
		this.score = 0;
	}

	init = () => {
		this.handleKeys();
		this.update();
		this.platforms.push(this.firstPlatform); 
		setInterval(this.createPlatforms, 10);
	};

	update = () => {
		this.clear();
		this.drawPlayer();
		this.player.move();
		this.drawPlatforms();
		this.platforms.forEach(p => p.increaseY())
		this.removePlatforms();
		this.drawScore();
		this.gameOver();
		requestAnimationFrame(this.update);
	};
	
	clear = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	drawPlayer = () => {
		this.player.drawComponent('./images/space-right.png');
	}

	createPlatforms = () => {
		if (this.platforms.length < 80) {
			//instantiate each platform and push them into the array of platforms
 			let platform = new Platform(this, Math.floor(Math.random() * this.platformMaxX), this.platformY,110,27);
			this.platforms.push(platform);
			if(this.y < 0  && Math.abs(platform.y) + this.platforms[this.platforms.length-2].y > 100) {
				console.log(platform, this.platformY, this.platforms.length, Math.abs(platform.y) + this.platforms[this.platforms.length-2].y > 100)
			}
			// console.log(platform.y - this.platforms[this.platforms.length-2].y)
			this.platformY -= 80; //increase the next platform height by 80
		}
	}

	drawPlatforms = () => {
		this.platforms.forEach(platform => {
			if (platform.explosionPossibility === 1) {
				platform.drawComponent('./images/broken-platform.png');
				platform.explodes = true;
				platform.checkCollision()
			} else {
			platform.drawComponent('./images/yellow-platform.png');
			platform.checkCollision()}
		});
	}

	removePlatforms = () => {
		// this.platforms.forEach(platform => {
		// 	if (platform.y > this.canvas.height + 100) this.platforms.splice(0,1)
		// }) 

		this.platforms.forEach((platform,i) => {
			if (platform.y > this.player.y + 1200) this.platforms.splice(i,1)
		})
	}

	drawScore = () => {
		this.ctx.font = "20px Courier New";
		this.ctx.fillText(`Score: ${Math.round(this.score)}`, 10, 20)
	}

	gameOver = () => {
		if (this.player.yVelocity > this.canvas.height + 1000) {
			this.score = 0;
			this.ctx.font = "100px Courier New";
			this.ctx.fillText(`GAME OVER`, 130, 450)
		}
	}

	handleKeys = () => {
        document.addEventListener("keydown", (event) => {
            switch (event.keyCode) {
                case 37: //left arrow
                case 65: //'a'
					this.player.xVelocity = -5
					if (this.player.x<0) this.player.x=this.canvas.width-this.player.width
                    break;
                case 39: //right arrow
                case 68: //'d'
					this.player.xVelocity = 5;
					if (this.player.x>this.canvas.width-this.player.width) this.player.x=0
                    break;
                default:
                    console.log("Invalid Key");
            }
        });

        document.addEventListener("keyup", (event) => {
            switch (event.keyCode) {
                case 37:
                case 65:
                    this.player.xVelocity = 0;
                    break;
                case 39:
                case 68:
                    this.player.xVelocity = 0;
                    break;
                default:
                    console.log("Invalid Key");
            }
        });
    }
}
