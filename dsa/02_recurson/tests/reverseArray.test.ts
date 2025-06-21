import  reverseArray  from "../array/reverse";

export default function reverseArrayTests() {
  describe('reverseArray', () => {
    it('should reverse an array of numbers', () => {
      expect(reverseArray([1, 2, 3, 4])).toEqual([4, 3, 2, 1]);
    });

    it('should reverse an array of strings', () => {
      expect(reverseArray(['a', 'b', 'c'])).toEqual(['c', 'b', 'a']);
    });

    it('should return an empty array when input is empty', () => {
      expect(reverseArray([])).toEqual([]);
    });
  });
}
