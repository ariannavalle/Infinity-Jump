class Platform extends Component {
	constructor(game, x, y, width, height) {
		super(game, x, y, width, height);
	}

	checkCollision = () => {
		this.y -= game.player.yVelocity * 0.01;
		game.player.yVelocity += 0.1; //this pulls the character down

		if (
			game.player.x+30 < this.x + this.width &&
			game.player.x-30 + game.player.width > this.x &&
			game.player.y < this.y + this.height &&
			game.player.y + game.player.height > this.y
		) {
            game.player.yVelocity = -canvas.height; 
		}
	};
}