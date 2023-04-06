export function sanitizeColourArrayIntoHex(allColoursInString, prefix = '#') {
  return allColoursInString
    .replaceAll(/[ \[\]]/ig, '')
    .split(',')
    .map(colour => {
      const hexColourRegEx = /0x([\da-f]+)/ig
      const isValidHexColour = colour.match(hexColourRegEx);
      if (!isValidHexColour) {
        return '<Error>';
      }

      return colour.replaceAll(hexColourRegEx, `${prefix}$1`);
    });
}