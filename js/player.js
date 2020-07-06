class Player extends Component {
	constructor(game, x, y, width, height, xVelocity, yVelocity) {
		super(game, x, y, width, height);
		this.xVelocity = xVelocity;
		this.yVelocity = yVelocity;
	}

	move() {
		this.x += this.xVelocity;
	}

	fall() {
		this.y += this.yVelocity;
		this.yVelocity += 0.1
	}
}
