let playertext = document.getElementById('playertext')
let restartbtn = document.getElementById('restartbtn')
let boxes = Array.from(document.getElementsByClassName('box')) //createas an array of boxes

let winnerindicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_TEXT = "O"
const X_TEXT = "X"
let current_player = X_TEXT


let spaces = Array(9).fill(null);// create array with nine space and fill with null to store playe inputs


const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

/* can be also written as
const startGame = () => {
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click', boxClicked);
    }
};*/

function boxClicked(e) {
    const id = e.target.id
    if (!spaces[id]) {
        spaces[id] = current_player
        e.target.innerText = current_player

        if (playerhaswon() !== false) {
            playertext.innerHTML = `${current_player} has won!`
            let win_block = playerhaswon()
            win_block.map(box => boxes[box].style.backgroundColor = winnerindicator)
            return

        }
        current_player = current_player == X_TEXT ? O_TEXT : X_TEXT
    }

}
const win_combo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]

function playerhaswon() {
    for (const i of win_combo) {
        let [a, b, c] = i;
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false

}

restartbtn.addEventListener('click', restartit)
function restartit() {
    spaces.fill(null)
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })
    playertext.innerHTML = 'tic tac toe'
    current_player = X_TEXT
}
startGame();

