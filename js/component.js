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

	drawComponent(imgSrc) {
		const ctx = this.game.ctx;
		this.img.src = imgSrc;
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
	
	makeSound(soundSrc) {
		this.sound.play();
	}
	  
}