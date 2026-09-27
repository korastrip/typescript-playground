import * as console from "node:console";

import { Player, playerValue, setError } from "./utils/games.js";
import { ask, rl } from "./utils/readline.js";

const BOARD_WIDTH = 7;
const BOARD_HEIGHT = 6;

let currentPlayer: Player = 'X'
const board: playerValue[][] = Array.from({length: BOARD_WIDTH}, () => Array.from({length: BOARD_HEIGHT}));

function drawBoard() {

}

 function selectColumn(column: number): false | { column: number, line: number, currentPlayer: Player } {
    if (column >= BOARD_WIDTH || column < 0) return false;
    for (let i = BOARD_HEIGHT - 1; i >= 0; i--) {
        if (!board[column][i]) {
            board[column][i] = currentPlayer;
            return {column, line: i, currentPlayer};
        }
    }

    return false;
}

function checkVertically(column: number, line: number, player: Player) {

    let check = 0;

    for (let i = line; i < 6; i++) {
        if (board[column][i] === player) check++;
        else break;

        if (check === 4) return true
    }

    return false;
}

function checkHorizontal(column: number, line: number, player: Player) {

    let check = 1;

    for (let i = column - 1; i > -1; i--) {
        if (board[i][line] === player) check++
        else break;
    }

    for (let i = column + 1; i < BOARD_WIDTH; i++) {
        if (board[i][line] === player) check++
        else break;
    }

    return check >= 4;

}

function checkDiagonal(column: number, line: number, player: Player) {
    let check = 1;

    for (let i = {c: column - 1, l: line - 1}; i.c >= 0 && i.l >= 0; i.c--, i.l--) {
        if (board[i.c][i.l] === player) check++
        else break;
    }

    for (let i = {c: column + 1, l: line + 1}; i.c <= 6 && i.l <= 5; i.c++, i.l++) {
        if (board[i.c][i.l] === player) check++
        else break;
    }

    if (check >= 4) {
        return true
    }

    check = 1;

    for (let i = {c: column + 1, l: line - 1}; i.c <= 6 && i.l >= 0; i.c++, i.l--) {
        if (board[i.c][i.l] === player) check++
        else break;
    }

    for (let i = {c: column - 1, l: line + 1}; i.c >= 0 && i.l <= 5; i.c--, i.l++) {
        if (board[i.c][i.l] === player) check++
        else break;
    }

    return check >= 4;
}

async function main(firstLaunch = true) {
    if (firstLaunch) {
        rl.write(`Welcome to Power4 \n\n${currentPlayer} is your turn !\n\n`)
    }
    const chosenColumn = await ask(`Player ${currentPlayer}: In what column do you want to push your power ? `);
    const chosenColumnNumber = Number(chosenColumn)
    if (chosenColumnNumber && chosenColumnNumber > 0 && chosenColumnNumber < 8) {
        const selectedColumn = selectColumn(chosenColumnNumber - 1)
        if (selectedColumn) {
            rl.write(`\n${selectedColumn.currentPlayer} Your power has been placed in (${selectedColumn.column},${selectedColumn.line})\n\n`)
            if (checkHorizontal(selectedColumn.column, selectedColumn.line, currentPlayer) || checkVertically(selectedColumn.column, selectedColumn.line, currentPlayer) || checkDiagonal(selectedColumn.column, selectedColumn.line, currentPlayer)) {
                rl.write(`Player ${currentPlayer}: has win the game! some gg in the chat`)
                rl.close();
                return;
            }

            const isAllBoardItemAreFilled = board.every((b) => {
                return b.every((p) => {
                    return p !== undefined
                })
            })

            if(isAllBoardItemAreFilled) {
                rl.write(`Nobody has ween Player X and Player O you're looser ! Tomato`);
                rl.close();
                return
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            console.clear()
            await main(false);
        } else {
            setError("This position is already declared by the other player\n\n");
            await main(false);
        }
    } else {
        setError("Invalid power position, your number has to be between 1 and 7\n\n")
    }
}

//await main()