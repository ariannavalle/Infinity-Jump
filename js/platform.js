class Platform extends Component {
	constructor(game, x, y, width, height) {
		super(game, x, y, width, height);
		this.playerOnTop = false; //the bottom of player needs to be on top of the platform to bounce off of it
		this.hasSpring = false;
		this.explodes = false;
		this.exploding = false;
		this.explosionPossibility = Math.floor(Math.random() * 5);
		this.moves = false;
	}

	increaseY = () => {
		this.y -= this.game.player.yVelocity * 0.01; 
	}

	checkCollision = () => {
		if (this.game.player.y < this.y - this.game.player.height) {
            this.playerOnTop = true;
		}
		
		//normal - player jumps when collides with platform 
		if (
			this.game.player.x+30 < this.x + this.width &&
			this.game.player.x-30 + this.game.player.width > this.x &&
			this.game.player.y < this.y + this.height &&
			this.game.player.y + this.game.player.height > this.y &&
			this.playerOnTop
		) {
			this.game.player.yVelocity = -1200; //determines how high the player will bounce up 
			this.game.player.makeSound('../sfx/jump.wav');
		}

		//platform explodes 
		if (this.explodes) {
			if (
				this.game.player.x+30 < this.x + this.width &&
				this.game.player.x-30 + this.game.player.width > this.x &&
				this.game.player.y < this.y + this.height &&
				this.game.player.y + this.game.player.height > this.y &&
				this.playerOnTop && this.explodes
			) {
				this.game.player.makeSound('../sfx/exploding-platform.mp3');
				this.exploding = true;
			}
		}
	};
}