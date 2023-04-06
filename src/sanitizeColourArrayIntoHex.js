export function sanitizeColourArrayIntoHex(allColoursInString, prefix = '#') {
  const output = [];
    allColoursInString
      .replaceAll(/[ \[\]]/ig, '')
      .split(',')
      .forEach(colour => {
          let sanitizedColour = '<Error>';
          const isValidHexColour = colour.match(/^0x[\da-f]+$/ig);
          if (isValidHexColour) {
              sanitizedColour = colour.replaceAll(/0x([\da-f]+)/ig, `${prefix}$1`);
          }

          output.push(sanitizedColour);
      });
    return output;
}