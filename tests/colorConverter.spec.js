function sanitizeColourArrayIntoHex(array, prefix = "#") {
    const newArray = array.replaceAll(/0x([\da-f]+)/ig, `"${prefix}$1"`)
    const newerArray = JSON.parse(newArray)
    return newerArray
}

describe("Color Converter Test", () => {
    test("If color is a hex code beginning with 0x, change it to a hex string without 0x", () => {
        // Arrange 
        const rawColourArray = "[0x000000, 0xFF00BB]"
        const expectedSanitizedArray = ["#000000", "#FF00BB"]

        // Act 
        const actualSanitizedArray = sanitizeColourArrayIntoHex(rawColourArray);

        // Assert
        expect(actualSanitizedArray).toEqual(expectedSanitizedArray)
    })

    test("It accepts predefied prefixes for the sanitized colour", () => {
        // Arrange 
        const rawColourArray = "[0x000000, 0xFF00BB]"
        const expectedSanitizedArray = ["0x000000", "0xFF00BB"]

        // Act 
        const actualSanitizedArray = sanitizeColourArrayIntoHex(rawColourArray, "0x");

        // Assert
        expect(actualSanitizedArray).toEqual(expectedSanitizedArray)
    })
})