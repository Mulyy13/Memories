const startButton = document.querySelector(".start");
const colors = [
  "red",
  "blue",
  "green",
  "pink",
  "yellow",
  "purple",
  "brown",
  "orange",
  "silver",
];

let seconds = 0;
let minutes = 0;
let timer;

const tiles = document.querySelectorAll(".board div");

const game = {
  board: [],
  playerChoose: [],
  points: 0,
};

const randomColor = function (i) {
  const color = colors[Math.floor(Math.random() * colors.length)];

  if (game.board.filter((item) => item.color === color).length >= 2) {
    return randomColor(i);
  }
  game.board.push({ id: i, color, isCorrect: false, element: tiles[i] });
};

function startTimer() {
  timer = setInterval(function () {
    seconds++;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
      if (minutes == 60) {
        minutes = 0;
        hours++;
      }
    }
    document.querySelector(".clock").innerHTML =
      (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
      ":" +
      (seconds > 9 ? seconds : "0" + seconds);
  }, 1000);
}
function resetTimer() {
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
}

function initGame() {
  startTimer();
  startButton.classList.remove("start");
  startButton.classList.add("start--active");
  startButton.innerHTML = "Reset";
  game.board = [];
  game.playerChoose = [];
  game.points = 0;
  tiles.forEach((item) => {
    item.classList = "";
    item.classList.add("hidden");
  });
  for (let i = 0; i < colors.length * 2; i++) {
    randomColor(i);
  }
  tiles.forEach((item, index) => {
    const tile = game.board.find((item) => item.id === index);
    item.classList.add(tile.color);
    item.addEventListener("click", () => {
      if (tile.isCorrect || game.playerChoose.length >= 2) return;
      item.classList.remove("hidden");
      game.playerChoose.push(tile);

      if (game.playerChoose.length >= 2) {
        // sprawdzenie czy kolory sa takie same jesli tak to dodajemy punkty
        const isCorrect =
          game.playerChoose[0].color == game.playerChoose[1].color;
        setTimeout(() => {
          game.playerChoose[0].element.classList.add("hidden");
          game.playerChoose[1].element.classList.add("hidden");

          if (isCorrect) {
            game.playerChoose[0].element.classList.add("correct");
            game.playerChoose[1].element.classList.add("correct");
            game.playerChoose[0].element.classList.remove("hidden");
            game.playerChoose[1].element.classList.remove("hidden");
            setTimeout(() => {
              if (game.points === 9) {
                alert(
                  "Wygrana!!!  " +
                    "Twój czas to : " +
                    minutes +
                    " minut " +
                    seconds +
                    " sekund , Gratulacje!"
                );
                clearInterval(timer);
                resetTimer(timer);
              }
            }, 10);
          }
          game.playerChoose = [];
        }, 1000);
        if (isCorrect) {
          game.points++;
          game.playerChoose[0].isCorrect = true;
          game.playerChoose[1].isCorrect = true;
        }
      }
    });
  });
}

startButton.addEventListener("click", function () {
  if (startButton.classList.contains("start--active")) {
    resetTimer();
    initGame();
  } else {
    resetTimer();
    initGame();
  }
});
