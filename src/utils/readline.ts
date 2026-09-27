import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">"
});

const ask = (message: string) => {
    return new Promise(resolve => {
        rl.question(message, resolve);
    });
}

export {
    rl,
    ask
}