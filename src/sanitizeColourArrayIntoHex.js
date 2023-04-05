export function sanitizeColourArrayIntoHex(array, prefix = "#") {
    const newArray = array.replaceAll(/0x([\da-f]+)/ig, `"${prefix}$1"`)
    const newerArray = JSON.parse(newArray)
    return newerArray
}