export function sanitizeColorArrayIntoHex(allColorsInString, prefix = '#') {
  return allColorsInString
    .replaceAll(' ', '')
    .split(',')
    .map(color => {
      const hexColorRegEx = /0x([\da-f]+)/ig
      if (!hexColorRegEx.test(color)) {
        return '<Error>';
      }

      return color.replaceAll(hexColorRegEx, `${prefix}$1`);
    });
}