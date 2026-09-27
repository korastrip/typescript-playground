import console from "node:console";
import { rl } from "./readline.js";

export type playerValue = undefined | 'X' | 'O';
export type Player = 'X' | 'O';

/**
 *
 * @param message Message to show when the error is set
 * @param callback
 * @return void
 */
const setError = (message: string, callback?: { beforeWrite?: () => void, afterWrite?: () => void }) => {

    console.clear();

    callback?.beforeWrite?.();
    rl.write(message);
    callback?.afterWrite?.();

}

export { setError };