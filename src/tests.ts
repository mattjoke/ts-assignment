import assert from "assert";
import { existsSync, readFileSync } from "fs";
import { Readable } from "stream";
import { reverse, Init } from ".";
import { jsonType } from "./types";

describe("Invert", () => {
    describe("Is the same length", () => {
        it("Returned string should be same length", () => {
            assert.strictEqual(reverse("AAAAAA").length, 6);
        });
    });

    describe("Reverses the string", () => {
        it("Returned string should be reversed", () => {
            const inputString = "arbitrary input?";
            assert.strictEqual(
                reverse(inputString).toLowerCase(),
                "?tupni yrartibra"
            );
        });
    });

    describe("Swaps cases", () => {
        it("Returned string should have swapped cases", () => {
            assert.strictEqual(reverse("abCD12"), "21dcBA");
        });
    });

    describe("Generate JSON", () => {
        it("Generates correct JSON", () => {
            const inputString = "Hello :D\n";
            Init(Readable.from([inputString]));
            let file: Buffer | null = null;

            assert.ok(existsSync("processed.json"));

            file = readFileSync("processed.json");
            const json = JSON.parse(file.toString("utf-8"));

            if (json == null) {
                assert.fail("Loaded json is not correct");
            }
            assert.strictEqual(json.input, "Hello :D");
            assert.strictEqual(json.output, "d: OLLEh");
        });
    });
});
