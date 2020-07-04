class Game {
	constructor() {
		this.canvas = document.querySelector("#canvas");
		this.ctx = this.canvas.getContext("2d");
		this.player = new Player(this, this.canvas.width/2-50, this.canvas.height-300, 100, 100, 0.1);
	}

	init = () => {
		let canvas = this.canvas;
		let ctx = this.ctx;

		this.clear();
		this.drawPlayer();
		this.player.jump();
		this.player.move()

		requestAnimationFrame(this.init);
	};
	
	clear = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	drawPlayer() {
		this.player.drawComponent('./images/space-right.png')
	}
}
