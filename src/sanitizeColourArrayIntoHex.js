export function sanitizeColourArrayIntoHex(allColoursInString, prefix = '#') {
  return allColoursInString
    .replaceAll(/[ \[\]]/ig, '')
    .split(',')
    .map(colour => {
      const isValidHexColour = colour.match(/^0x[\da-f]+$/ig);
      if (!isValidHexColour) {
        return '<Error>';
      }

      return colour.replaceAll(/0x([\da-f]+)/ig, `${prefix}$1`);
    });
}