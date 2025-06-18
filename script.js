let currentTurn = "X";
const clicks = document.querySelectorAll(".play");
let player1 = document.getElementById("Xwin");
let player2 = document.getElementById("Owin");
let turn = document.getElementById("turn");
let winnerText = document.getElementById("winner");
let isVsAI = false;

const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function check() {
    for (let result of wins) {
        const [a, b, c] = result;
        if (clicks[a].textContent !== "" &&
            clicks[a].textContent === clicks[b].textContent &&
            clicks[b].textContent === clicks[c].textContent) {
            winnerText.textContent = "Winner is: " + clicks[a].textContent;
            result.forEach(index => {
                clicks[index].style.background = "greenyellow";
            });
            clicks.forEach(button => button.disabled = true);
            if (clicks[a].textContent === "X") {
                player1.textContent = parseInt(player1.textContent) + 1;
            } else {
                player2.textContent = parseInt(player2.textContent) + 1;
            }
            return true;
        }
    }
    const draw = [...clicks].every(button => button.textContent !== "");
    if (draw) {
        winnerText.textContent = "Draw";
        return true;
    }
    return false;
}

function aiMove() {
    const emptyButtons = [...clicks].filter(btn => btn.textContent === "");
    if (emptyButtons.length === 0) return;
    const randomButton = emptyButtons[Math.floor(Math.random() * emptyButtons.length)];
    randomButton.textContent = "O";
    randomButton.style.color = "black";
    currentTurn = "X";
    turn.textContent = currentTurn + "'s Turn";
    check();
}

clicks.forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent === "") {
            if (isVsAI) {
                if (currentTurn === "X") {
                    button.textContent = "X";
                    button.style.color = "red";
                    currentTurn = "O";
                    turn.textContent = currentTurn + "'s Turn";
                    if (!check()) {
                        setTimeout(() => {
                            aiMove();
                        }, 500);
                    }
                }
            } else {
                button.textContent = currentTurn;
                button.style.color = currentTurn === "X" ? "red" : "black";
                currentTurn = currentTurn === "X" ? "O" : "X";
                turn.textContent = currentTurn + "'s Turn";
                check();
            }
        }
    });
});

function newGame() {
    document.getElementById("new").addEventListener("click", () => {
        clicks.forEach(button => {
            button.style.background = "";
            button.textContent = "";
            button.disabled = false;
        });
        currentTurn = "X";
        winnerText.textContent = "TIC - TAC - TOE!";
        turn.textContent = currentTurn + "'s Turn";
    });
}
newGame();

function resetScore() {
    document.getElementById("resetScore").addEventListener("click", () => {
        player1.textContent = "0";
        player2.textContent = "0";
    });
}
resetScore();

function saveScore() {
    localStorage.setItem("player1Score", player1.textContent);
    localStorage.setItem("player2Score", player2.textContent);
}
function loadScore() {
    player1.textContent = localStorage.getItem("player1Score") || "0";
    player2.textContent = localStorage.getItem("player2Score") || "0";
}
window.addEventListener("beforeunload", saveScore);
window.addEventListener("load", loadScore);

const [pvpBtn, aiBtn] = document.querySelectorAll(".gameMode button");

pvpBtn.addEventListener("click", () => {
    isVsAI = false;
    pvpBtn.style.background = "Black";
    aiBtn.style.background = "";
    newGameNow();
});
aiBtn.addEventListener("click", () => {
    isVsAI = true;
    aiBtn.style.background = "black";
    pvpBtn.style.background = "";
    newGameNow();
});

function newGameNow() {
    clicks.forEach(button => {
        button.style.background = "";
        button.textContent = "";
        button.disabled = false;
    });
    currentTurn = "X";
    winnerText.textContent = "TIC - TAC - TOE!";
    turn.textContent = currentTurn + "'s Turn";
}
