document.addEventListener("DOMContentLoaded", function () {
    const board = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    function createBoard() {
        const boardElement = document.getElementById("sudoku-board");
        boardElement.innerHTML = "";

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const input = document.createElement("input");
                input.type = "text";
                input.classList.add("cell");

                if (board[i][j] !== 0) {
                    input.value = board[i][j];
                    input.setAttribute("readonly", true);
                }

                input.dataset.row = i;
                input.dataset.col = j;
                input.addEventListener("input", validateInput);
                boardElement.appendChild(input);
            }
        }
    }

    function validateInput(event) {
        let value = event.target.value;
        if (!/^[1-9]$/.test(value)) {
            event.target.value = "";
        }
    }

    function solveSudoku() {
        const cells = document.querySelectorAll(".cell");
        let tempBoard = board.map(row => row.slice());

        if (solve(tempBoard)) {
            cells.forEach((cell, index) => {
                let row = Math.floor(index / 9);
                let col = index % 9;
                cell.value = tempBoard[row][col];
            });
        } else {
            alert("No solution exists!");
        }
    }

    function solve(board) {
        let empty = findEmpty(board);
        if (!empty) return true;

        let [row, col] = empty;
        for (let num = 1; num <= 9; num++) {
            if (isValid(board, num, row, col)) {
                board[row][col] = num;
                if (solve(board)) return true;
                board[row][col] = 0;
            }
        }
        return false;
    }

    function findEmpty(board) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === 0) return [i, j];
            }
        }
        return null;
    }

    function isValid(board, num, row, col) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num || board[i][col] === num) return false;
            let boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            let boxCol = 3 * Math.floor(col / 3) + i % 3;
            if (board[boxRow][boxCol] === num) return false;
        }
        return true;
    }

    function resetBoard() {
        document.querySelectorAll(".cell").forEach(cell => {
            let row = cell.dataset.row;
            let col = cell.dataset.col;
            if (!cell.hasAttribute("readonly")) cell.value = "";
        });
    }

    document.getElementById("solve").addEventListener("click", solveSudoku);
    document.getElementById("reset").addEventListener("click", resetBoard);

    createBoard();
});
