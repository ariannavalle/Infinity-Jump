class Player extends Component {
	constructor(game, x, y, width, height, xVelocity, yVelocity) {
		super(game, x, y, width, height);
		this.xVelocity = xVelocity;
		this.yVelocity = yVelocity;
	}

	move() {
		this.x += this.xVelocity;
		this.game.player.yVelocity += 28; 
		this.game.score += 0.1
	}
}
