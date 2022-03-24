const container = document.querySelector(".container")

let currentPlayer = ""

const allCells = document.querySelectorAll(".cell")

let isCoolDown = false

let markedCellsPlayer = []
let markedCellsComputer = []

const winningIndicesCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

document.addEventListener("DOMContentLoaded", () => {
    choosePlayer()
})

function choosePlayer() {
    currentPlayer = prompt("type x or o").toUpperCase()
}

container.addEventListener("click", (e) => {
    if (e.target.innerHTML === "" && !isCoolDown) {
        e.target.innerHTML = currentPlayer

        const index = getCellIndex(e.target)
        markedCellsPlayer.push(index)

        setTimeout(() => {
            if (checkIsTie()) {
                handleTie()
                return
            } else if (checkWin(markedCellsPlayer)) {
                handleGameEnd()
                return
            }

            handlePlayerChange()
            isCoolDown = true
            setTimeout(computerMove, 300)
        },0)

    }
})

function getAvailableIndices() {
    const availableIndices = []
    for (let i = 0; i < allCells.length; i++) {
        if (allCells[i].innerHTML === "") {
            availableIndices.push(i)
        }
    }
    return availableIndices
}

function computerMove() {
    const availableIndices = getAvailableIndices()
    const random = Math.floor(Math.random() * availableIndices.length)
    const randomCellIndex = availableIndices[random]
    if (isCoolDown) {
        allCells[randomCellIndex].innerHTML = currentPlayer
        markedCellsComputer.push(randomCellIndex)
        if (checkWin(markedCellsComputer)) {
            handleGameEnd()
            return
        }
        handlePlayerChange()
    }
    isCoolDown = false
}

function checkWin(markedIndices) {
    return winningIndicesCombos.some((combination) => {
        return combination.every(index => {
            return markedIndices.includes(index)
        })
    })
}

function checkIsTie() {
    for (const cell of allCells) {
        if (cell.innerHTML === "") return false
    }
    return true
}

function handleTie() {
    alert("tie!")
    resetGame()
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function getCellIndex(target) {
    return parseInt(target.getAttribute("data-index"))
}

function showWinMessage() {
    alert(`${currentPlayer} won!`)
}

function resetGame() {
    for (const cell of allCells) {
        cell.innerHTML = ""
    }
    markedCellsPlayer = []
    markedCellsComputer = []
    setTimeout(choosePlayer, 0)
}

function handleGameEnd() {
    showWinMessage()
    resetGame()
}