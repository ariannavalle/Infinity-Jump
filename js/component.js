class Component {
	constructor(game, x, y, width, height) {
		this.game = game;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.img = new Image();
		this.sound = new Audio();
	}

	drawComponent(imgSrc, x=this.x, y=this.y, w=this.width, h=this.height) {
		const ctx = this.game.ctx;
		this.img.src = imgSrc;
		ctx.drawImage(this.img, x, y, w, h);
	}

	makeSound(soundSrc) {
		this.sound.src = soundSrc;
		this.sound.play();
	}
}