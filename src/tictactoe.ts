import * as console from "node:console";

import { ask, rl } from "./utils/readline.js";
import { setError, type Player, type playerValue } from "./utils/games.js";

let currentPlayer: Player = 'X'
let playerPoint: playerValue[] = Array.from({length: 9});

const victoryCondition: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];

function validatePositionToArray() {
    return victoryCondition.some((victoryNumber) => {
        return victoryNumber.every((v) => {
            return playerPoint[v] === currentPlayer
        })
    });
}

const playerDisplay = (index: number) => {
    return playerPoint[index] === undefined ? '/' : playerPoint[index];
}

function displayGameTable() {
    let gameTable = "\n\n";

    for (let i = 1; i < 10; i++) {
        gameTable += `${i % 3 === 1 && i !== 1 ? '\n' : ''}${playerDisplay(i - 1)} | `
    }

    gameTable += "\n\n"
    rl.write(gameTable)
}

async function main() {
    let position = await ask(`Player ${currentPlayer}: What case do you want to use ? `);

    const numberPosition = Number(position);
    if (numberPosition && numberPosition > 0 && numberPosition < 10) {

        const precedentPosition = numberPosition - 1;
        if (!playerPoint[precedentPosition]) {

            playerPoint[precedentPosition] = currentPlayer;
            console.clear();

            const validStateLength = playerPoint.filter((state) => state !== undefined).length;
            displayGameTable()

            if (validStateLength > 4) {
                if(validatePositionToArray()) {
                    rl.close();
                    console.log(`${currentPlayer} vient de gagner la partie !`);
                    return;
                }

                if (validStateLength === 9) {
                    rl.close();
                    console.log("La partie est terminée personne n'a gagné");
                    return;
                }

            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            await main();
        } else {

            setError(`This cas was already assigned to ${playerDisplay(precedentPosition)} player.\n\n`, { beforeWrite: displayGameTable });
            await main();

        }

    } else {

        setError("Invalid position please select a position between 1 and 9\n\n", { beforeWrite: displayGameTable });
        await main();

    }
}

try {
    await main();
} catch {

}