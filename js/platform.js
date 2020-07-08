class Platform extends Component {
	constructor(game, x, y, width, height) {
		super(game, x, y, width, height);
		this.playerOnTop = false; //the bottom of player needs to be on top of the platform to bounce off of it
	}

	checkCollision = () => {
		this.y -= this.game.player.yVelocity * 0.01; //gravity movement, pulls the player down 
		this.game.player.yVelocity += 0.1; //increases the downward movement gradually
		this.game.score += 0.001

		if (this.game.player.y < this.y-this.game.player.height) {
            this.playerOnTop = true;
		}
		
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
	};
}