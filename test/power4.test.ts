import { expect, test, describe } from 'vitest';
import { Player, playerValue } from "../src/utils/games.js";

const boardOption = {
    width: 7,
    height: 6
}

const createBoard = (): playerValue[][] => {
    return Array.from({length: boardOption.width}, () => Array.from({length: boardOption.height}));
}

const selectColumn = (board: playerValue[][], column: number, currentPlayer: Player = "X"): false | { column: number, line: number, currentPlayer: Player } => {
    if (column >= boardOption.width || column < 0) return false;
    for (let i = boardOption.height - 1; i >= 0; i--) {
        if (!board[column][i]) {
            board[column][i] = currentPlayer;
            return {column, line: i, currentPlayer};
        }
    }

    return false;
}

describe('Power 4', () => {

    test('A pawn should reject a column outside the board', () => {

        const board = createBoard();

        const valueForIndexZero = selectColumn(board, -1);
        const valueForIndexHeight = selectColumn(board, 8);

        expect(valueForIndexZero).toBe(false);
        expect(valueForIndexHeight).toBe(false);
    });

    test('A pawn should be at the position (0,5) if it place at column 0', () => {

        const board = createBoard();
        selectColumn(board, 0);

        expect(board[0][5]).toBe('X')

    });

})