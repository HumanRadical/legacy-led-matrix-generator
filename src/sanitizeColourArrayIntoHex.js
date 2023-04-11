export function sanitizeColourArrayIntoHex(allColoursInString, prefix = '#') {
  return allColoursInString
    .replaceAll(' ', '')
    .split(',')
    .map(colour => {
      const hexColourRegEx = /0x([\da-f]+)/ig
      if (!hexColourRegEx.test(colour)) {
        return '<Error>';
      }

      return colour.replaceAll(hexColourRegEx, `${prefix}$1`);
    });
}