// Avoid matching a phone-shaped digit sequence inside a statistical decimal or hash.
export const privacyPatterns = [
  /\+57[\s\d]{6,}/,
  /(?<![\w.])3\d{2}[ -]?\d{3}[ -]?\d{4}(?![\w.])/,
];
