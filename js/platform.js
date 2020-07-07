class Platform extends Component {
	constructor(game, x, y, width, height) {
		super(game, x, y, width, height);
		this.playerOnTop = false; //the bottom of player needs to be on top of the platform to bounce off of it
	}

	checkCollision = () => {
		this.y -= game.player.yVelocity * 0.01; //gravity movement, pulls the player down 
		game.player.yVelocity += 0.1; //increases the downward movement gradually

		if (game.player.y < this.y-game.player.height) {
            this.playerOnTop = true;
		}
		
		if (
			game.player.x+30 < this.x + this.width &&
			game.player.x-30 + game.player.width > this.x &&
			game.player.y < this.y + this.height &&
			game.player.y + game.player.height > this.y &&
			this.playerOnTop
		) {
			game.player.yVelocity = -1200; //determines how high the player will bounce up 
		}
	};
}