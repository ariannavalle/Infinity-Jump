class Platform extends Component {
	constructor(game, x, y, width, height) {
		super(game, x, y, width, height);
		this.playerOnTop = false; //the bottom of player needs to be on top of the platform to bounce off of it
		this.explodes = false;
		this.exploding = false;
		this.explosionPossibility = Math.floor(Math.random() * 5);
		this.disappears = false;
		this.disappearing = false;
		this.disappearPossibility = Math.floor(Math.random() * 5);
		this.hasSpring = false;
		this.springPossibility = Math.floor(Math.random() * 7);
		this.springPosition = this.x+Math.floor(Math.random() * 75)
		this.hasEnemy = false;
		this.enemyPossibility = Math.floor(Math.random() * 30);
		this.enemyPossibility1 = Math.floor(Math.random() * 30);
		this.enemyPossibility2 = Math.floor(Math.random() * 30);
	}

	increaseY = () => {
		this.y -= this.game.player.yVelocity * 0.01; 
	}

	checkCollision = () => {
		if (this.game.player.y < this.y - this.game.player.height) {
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
			this.game.player.makeSound('./sfx/jump.wav');
			if (this.explodes){ 
				this.game.player.makeSound('./sfx/exploding-platform.mp3');
				this.exploding = true;
			}
			if (this.disappears){ 
				this.game.player.makeSound('./sfx/disappearing-platform.mp3');
				this.disappearing = true;
			}
		}
		if (this.hasSpring){ 
			if (this.game.player.x < this.springPosition + 20 &&
				this.game.player.x + this.game.player.width > this.springPosition &&
				this.game.player.y < this.y && 
				this.game.player.y + this.game.player.height > this.y-20 && 
				this.playerOnTop) {
					this.game.player.makeSound('./sfx/spring.mp3');
					this.game.player.yVelocity = -1800;
				}
		}
		if (this.hasEnemy){ 
			if (this.game.player.x+30 < this.x + this.width && //player coming from left side
				this.game.player.x-30 + this.game.player.width > this.x && //player coming from right side
				// this.game.player.y < this.y+this.game.player.height-36 && //player coming from bottom
				this.game.player.y < this.y-10 && //player coming from bottom
				this.game.player.y + this.game.player.height+35 > this.y //player coming from top
				) {
					this.game.drawPlayer(player, playerLeft, playerRight)
					this.game.player.makeSound('./sfx/enemy-crash.mp3');
					this.game.killedByEnemy = true;
				}
		}
	};
}