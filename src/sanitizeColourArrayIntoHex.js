export function sanitizeColourArrayIntoHex(allColoursInString, prefix = '#') {
    return allColoursInString
      .replaceAll(/[ \[\]]/ig, '')
      .split(',')
      .map(colour => {
          const isValidHexColour = colour.match(/^0x[\da-f]+$/ig);
          if (isValidHexColour) {
              return colour.replaceAll(/0x([\da-f]+)/ig, `${prefix}$1`);
          }

          return '<Error>';
      });
}