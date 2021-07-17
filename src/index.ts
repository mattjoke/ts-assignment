import { writeFileSync } from "fs";
import { createInterface } from "readline";
import { Readable } from "stream";
import { jsonType } from "./types";

export const reverse = (input: string) => {
    //First aproach
    let output = "";
    for (let i = input.length - 1; i >= 0; i--) {
        const element = input[i];
        const elementCode = input[i].charCodeAt(0);
        if (elementCode < 65) {
            output += element;
            continue;
        }
        if (elementCode < 91) {
            output += String.fromCharCode(elementCode + 32);
            continue;
        }
        if (elementCode < 97) {
            output += element;
            continue;
        }
        if (elementCode < 123) {
            output += String.fromCharCode(elementCode - 32);
            continue;
        }
        output += element;
    }
    return output;
};

export const Init = (stdin: Readable | null = null) => {
    const rl = createInterface({
        input: stdin ?? process.stdin,
        output: process.stdout,
        terminal: stdin ? false : true,
    });
    rl.question("Enter input string: ", (answer: string) => {
        const start = process.hrtime.bigint();
        const string = reverse(answer);
        const end = process.hrtime.bigint();

        const output: jsonType = {
            input: answer,
            output: string,
            executionTime: `${Number(end - start) / 1000000}ms`,
        };

        writeFileSync("processed2.json", JSON.stringify(output, null, 4));
        rl.close();
    });
};

Init();

export default reverse;
