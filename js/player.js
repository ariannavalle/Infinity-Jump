class Player extends Component {
	constructor(game, x, y, width, height, velocity) {
		super(game, x, y, width, height);
		this.velocity = velocity;
	}

	jump() {
		/* 
		 * if (the player's position + height is greater than the bottom of the canvas) → reverse direction
		 * else → move up 0.2 every frame
		 * then → move down by 0.2 
		 */
		if (this.y + this.height > canvas.height) {
			this.velocity = -this.velocity;
		} else {
			this.velocity += 0.2;
		}
		this.y += this.velocity;
	}

	move() {
		document.addEventListener("keydown", (event) => {
			switch (event.keyCode) {
				case 37:
				case 65:
					if (this.x >= 0) this.x--;
					break;
				case 39:
				case 83:
					if (this.x <= canvas.width - this.width) this.x++;
					break;
				default:
					console.log("Invalid Key");
			}
		});
	}
}
