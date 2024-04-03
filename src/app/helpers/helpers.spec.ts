import { isBoardValid } from "./helpers";

describe('', () => {
  it('checks if the board is valid', () => {
    const validBoard = [
      [{ value: 1, readOnly: false }, { value: 2, readOnly: false }, { value: 3, readOnly: false }],
      [{ value: 4, readOnly: false }, { value: 5, readOnly: false }, { value: 6, readOnly: false }],
      [{ value: 7, readOnly: false }, { value: 8, readOnly: false }, { value: 9, readOnly: false }]
    ];
  
    const invalidBoard1 = [
      [{ value: 1, readOnly: false }, { value: 2, readOnly: false }, { value: 3, readOnly: false }],
      [{ value: 4, readOnly: false }, { value: 5, readOnly: false }, { value: 6, readOnly: false }],
      [{ value: 7, readOnly: false }, { value: 0, readOnly: false }, { value: 9, readOnly: false }]
    ];
  
    const invalidBoard2 = [
      [{ value: 1, readOnly: false }, { value: 2, readOnly: false }, { value: 3, readOnly: false }],
      [{ value: 4, readOnly: false }, { value: 10, readOnly: false }, { value: 6, readOnly: false }],
      [{ value: 7, readOnly: false }, { value: 8, readOnly: false }, { value: 9, readOnly: false }]
    ];
  
    expect(isBoardValid(validBoard)).toBe(true);
    expect(isBoardValid(invalidBoard1)).toBe(false);
    expect(isBoardValid(invalidBoard2)).toBe(false);
  })
});
