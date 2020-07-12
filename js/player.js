class Player extends Component {
	constructor(game, x, y, width, height, xVelocity, yVelocity, direction) {
		super(game, x, y, width, height);
		this.xVelocity = xVelocity;
		this.yVelocity = yVelocity;
		this.direction = direction;
	}

	move() {
		this.x += this.xVelocity;
		this.game.player.yVelocity += 28; 
	}
}
