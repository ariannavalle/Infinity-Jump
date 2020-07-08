class Game {
	constructor() {
		this.canvas = document.querySelector("#canvas");
		this.ctx = this.canvas.getContext("2d");
		this.player = new Player(this, this.canvas.width/2-50, this.canvas.height-300, 100, 100, 0, 3);
		this.firstPlatform = new Platform(this, this.canvas.width/2-50, this.canvas.height-30, 100,20); //first platform will be static and positioned underneath the player's starting position to ensure the player doesn't fall down as soon as the game starts
		this.platforms = []; //the rest of the platforms will be pushed into this array with dynamically set x and y values
		this.platformMaxX = this.canvas.width-this.firstPlatform.width; //the max x value that the platform can be positioned (the width of the canvas minus the width of the platform)
		this.platformY = canvas.height;
		this.score = 0;
	}

	init = () => {
		this.handleKeys();
		this.update();
		this.platforms.push(this.firstPlatform); 
		//todo: declare winner if player gets to the top
		//instantiate each platform and push them into the array of platforms
		for (let i = 0; i < 300; i++) { 
			//getting a number between 2 values: Math.random() * (max - min) + min;
			let platform = new Platform(this, Math.floor(Math.random() * this.platformMaxX), this.platformY,100,20);
			this.platforms.push(platform);
			this.platformY -= 80; //increase the next platform height by 80
		}
	};

	update = () => {
		this.clear();
		this.drawPlayer();
		this.player.move();
		this.drawPlatforms();
		this.drawScore();
		requestAnimationFrame(this.update);
	};
	
	clear = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	drawPlayer = () => {
		this.player.drawComponent('./images/space-right.png');
	}

	drawPlatforms = () => {
		this.platforms.forEach(platform => {
			platform.drawComponent('images/pink-platform.png');
			platform.checkCollision();});
	}

	drawScore = () => {
		this.ctx.font = "20px Courier New";
		this.ctx.fillText(`Score: ${Math.round(this.score)}`, 10, 20)
	}

	handleKeys = () => {
        document.addEventListener("keydown", (event) => {
            switch (event.keyCode) {
                case 37: //left arrow
                case 65: //'a'
                    this.player.xVelocity = -5
                    break;
                case 39: //right arrow
                case 68: //'d'
                    this.player.xVelocity = 5;
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
