const gameBoard = document.getElementById("canvas")
const gameIntro = document.getElementById("game-intro")
const doodlerPlayer = document.getElementById("doodler")
const ronaPlayer = document.getElementById("rona")
const nyanPlayer = document.getElementById("nyan")

doodlerPlayer.addEventListener("click", (event) => {
    gameIntro.style.display = "none";
    gameBoard.style.display = "inline-block";
    document.body.style.backgroundImage = "url('../images/planet.jpg')";
    const game = new Game();
    player = doodler[0]
    playerRight = doodler[0]
    playerLeft = doodler[1]
    game.init();
});

ronaPlayer.addEventListener("click", (event) => {
    gameIntro.style.display = "none";
    gameBoard.style.display = "inline-block";
    document.body.style.backgroundImage = "url('../images/city.jpg')";
    const game = new Game();
    player = rona[0]
    playerRight = rona[0]
    playerLeft = rona[0]
    game.init();
});

nyanPlayer.addEventListener("click", (event) => {
    gameIntro.style.display = "none";
    gameBoard.style.display = "inline-block";
    document.body.style.backgroundImage = "url('../images/outer-space.jpg')";
    const game = new Game();
    player = nyan[0]
    playerRight = nyan[0]
    playerLeft = nyan[0]
    game.init();
});