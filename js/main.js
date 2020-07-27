var game = new XandOGame();

var fields = document.querySelectorAll("[data-x][data-y]");
let gameFrend = document.querySelector(".gameFrend");
let gameMashin = document.querySelector(".gameMex");
let newGame = document.querySelector(".newGave");
let register = document.querySelector(".register");
let registerPlayerMenu = document.querySelector(".register-player-menu");
let flag = true;

gameFrend.addEventListener("click", () => {
  styleBlock(registerPlayerMenu, register);
});

gameMashin.addEventListener("click", () => {
  styleBlock(registerPlayerMenu, register);
});

newGame.addEventListener("click", () => {
  let _namePlayer1 = document.querySelector(".namePlayerOne").value;
  let _namePlayer2 = document.querySelector(".namePlayerTwo").value;

  let field = document.querySelector(".field");
  let fieldMenu = document.querySelector(".field-menu");
  styleBlock(field, registerPlayerMenu, fieldMenu);

  let start = document.querySelector("button");
  start.addEventListener("click", () => {
    game.createPlayer(_namePlayer1, "X", false);
    game.createPlayer(_namePlayer2, "O", flag ? flag : false);
    game.startGame();
    refreshFields();
  });
});

function styleBlock(param1, param2, param3) {
  if (param1.style.display != "block") {
    param1.style.display = "block";
    param2.style.display = "none";
    param3.style.display = "block";
  }
  return;
}

function getXY(element) {
  return [Number(element.getAttribute("data-x")), Number(element.getAttribute("data-y"))];
}

function refreshFields() {
  fields.forEach((el) => {
    var [x, y] = getXY(el);
    el.innerHTML = game.gameFeild[x][y] === 0 ? "" : game.gameFeild[x][y];
  });
  let statusGame = document.getElementById("statusGame");
  game.complit ? (statusGame.innerHTML = "Статус игры: играем") : (statusGame.innerHTML = "Статус игры: игра закончена");
  document.getElementById("whoGo").innerHTML = `Кто ходит: ${game.getWhoGo()}`;
  document.getElementById("whoWin").innerHTML = `Победитель: ${game.getWhoWin()}`;
  if (game.whoWin != null) {
    let animationGame = new Animation(drawOut, tF, 3000);
    animationGame.start();
    function drawOut(process) {
      let imgGame = document.querySelector(".imgGame");
      imgGame.innerHTML = "You WIN";
      imgGame.style.transform = "translateY(-" + process - 20 + "px)";
    }
  }
}
fields.forEach((el) => {
  el.addEventListener("click", () => {
    var [x, y] = getXY(el);
    game.go(x, y);
    refreshFields();
  });
});
refreshFields();
