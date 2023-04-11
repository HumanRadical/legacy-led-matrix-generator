import { sanitizeColourArrayIntoHex } from "../src/sanitizeColourArrayIntoHex"

describe("Colour Converter Test", () => {
    test("If colour is a hex code beginning with 0x, change it to a hex string without 0x", () => {
        const rawColourArray = "0x000000, 0xFF00BB"
        const expectedSanitizedArray = ["#000000", "#FF00BB"]

        const actualSanitizedArray = sanitizeColourArrayIntoHex(rawColourArray);

        expect(actualSanitizedArray).toEqual(expectedSanitizedArray)
    })

    test("It accepts predefined prefixes for the sanitized colour", () => {
        const rawColourArray = "0x000000, 0xFF00BB"
        const expectedSanitizedArray = ["0x000000", "0xFF00BB"]

        const actualSanitizedArray = sanitizeColourArrayIntoHex(rawColourArray, "0x");

        expect(actualSanitizedArray).toEqual(expectedSanitizedArray)
    })

    test("It replaces any invalid hex colours with <Error>", () => {
        const rawColourArray = "0x000000, Foobar"
        const expectedSanitizedArray = ["#000000", "<Error>"]

        const actualSanitizedArray = sanitizeColourArrayIntoHex(rawColourArray);

        expect(actualSanitizedArray).toEqual(expectedSanitizedArray)
    })
})