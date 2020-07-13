class Game {
	constructor() {
		this.canvas = document.querySelector("#canvas");
		this.ctx = this.canvas.getContext("2d");
		this.player = new Player(this, this.canvas.width/2-50, this.canvas.height-300, 100, 100, 0, 3);
		this.firstPlatform = new Platform(this, this.canvas.width/2-50, this.canvas.height+80, 110,27); //first platform will be static and positioned underneath the player's starting position to ensure the player doesn't fall down as soon as the game starts
		this.platforms = []; //the rest of the platforms will be pushed into this array with dynamically set x and y values
		this.platformMaxX = this.canvas.width-this.firstPlatform.width; //the max x value that the platform can be positioned (the width of the canvas minus the width of the platform)
		this.score = 0;
		this.highScore = localStorage.getItem('highScore')
		this.currentFrame = 0;
		this.explosionFrames = explosionAnimation; 
	}

	init = () => {
		this.handleKeys();
		this.update();
		this.platforms.push(this.firstPlatform); 
		setInterval(this.createPlatforms, 10);
	};

	update = () => {
		this.clear();
		this.drawPlayer(player, playerLeft, playerRight);
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

	drawPlayer = (player, playerLeft, playerRight) => {
		if (!this.player.direction) this.player.drawComponent(player)
		else if (this.player.direction === "left") this.player.drawComponent(playerLeft);
		else if (this.player.direction === "right") this.player.drawComponent(playerRight);
	}

	createPlatforms = () => {
		if (this.platforms.length < 80) {
			//instantiate each platform and push them into the array of platforms
			 let platform = new Platform(this, Math.floor(Math.random() * this.platformMaxX), this.platforms[this.platforms.length - 1].y -80,110,27);
			this.platforms.push(platform);
		}
	}

	drawPlatforms = () => {
		this.platforms.forEach((platform,i)=> {
			if (platform.explosionPossibility === 1) {
				if(platform.exploding) {
					platform.drawComponent(this.explosionFrames[this.currentFrame]) //platform animation while exploding 
					if (this.currentFrame === this.explosionFrames.length-1) {
						this.platforms.splice(i,1) //todo: fix flicker
						this.currentFrame = 0;
						platform.exploding = false;
					}
					this.currentFrame++
				}
				else {
				platform.drawComponent('./images/exploding-00.png'); //platforms that explode
				platform.explodes = true;
				platform.checkCollision()}
			} 
			else if (platform.disappearPossibility === 1) {
				if(platform.disappearing) {
					this.platforms.splice(i,1)
				} 
				platform.disappears = true;
				platform.drawComponent('./images/disappearing-platform.png');
				platform.checkCollision()
			}
			else if (platform.springPossibility === 1) {
				platform.hasSpring = true;
				platform.drawComponent('./images/default-platform.png');
				platform.drawComponent('./images/spring.png', platform.springPosition, platform.y-10, 20, 20 )
				platform.checkCollision()
			}
			else {
			platform.drawComponent('./images/default-platform.png'); //default platform
			platform.checkCollision()}
		});
	}

	removePlatforms = () => {
		this.platforms.forEach((platform,i) => {
			if (platform.y > this.player.y + 500) {
				this.platforms.splice(i,1)
				this.score++
				if (this.score > this.highScore) {
					this.highScore = this.score;
					localStorage.setItem('highScore', this.highScore); }
			}	
		})
	}

	drawScore = () => {
		this.ctx.font = "30px DoodleJump";
		this.ctx.fillText(`score: ${this.score}`, 10, 20)
		;
	}

	gameOver = () => {
		if (this.player.yVelocity > this.canvas.height + 1000) {
			this.clear()
			this.ctx.font = "100px DoodleJump";
			this.ctx.fillText(`GAME OVER`, 180, 400)
			this.ctx.font = "30px DoodleJump";
			this.ctx.fillText(`Final Score: ${this.score}`, 290, 450)
			this.ctx.fillText(`Your High Score: ${this.highScore}`, 250, 500)
		}
	}

	handleKeys = () => {
        document.addEventListener("keydown", (event) => {
            switch (event.keyCode) {
                case 37: //left arrow
                case 65: //'a'
					this.player.xVelocity = -5
					this.player.direction = 'left';
					if (this.player.x<0) this.player.x=this.canvas.width-this.player.width
                    break;
                case 39: //right arrow
                case 68: //'d'
					this.player.xVelocity = 5;
					this.player.direction = 'right';
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
