class Particle {
    constructor(game){
        this.game = game;
        this.x = this.game.player.x+this.game.player.width/2;
        this.y = this.game.player.y+this.game.player.height+20;
        this.size = Math.random() * 7 + 3;
        this.speedX = Math.random() * .01 - 1.5;
        this.speedY =  Math.random() * 3 - 0.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw(){
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.game.ctx.fill();
    }
}