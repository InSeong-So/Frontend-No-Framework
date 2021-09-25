const validator = require('../utils/validator');

describe('validator.js', () => {
  describe('isNumber(a: any)', () => {
    test('should return true when received number type argument.', () => {
      expect(validator.isNumber(1)).toBe(true);
    });

    test('should return false when received other type argument.', () => {
      expect(validator.isNumber('1')).toBe(false);
      expect(validator.isNumber([])).toBe(false);
    });
  });
});
