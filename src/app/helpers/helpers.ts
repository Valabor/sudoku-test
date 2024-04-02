import { BoardCell, Board } from "../models/sudoku.model";

export function getSolution(board: BoardCell[][]): Board {
  return board.map(row => (
    row.map((cell) => (+cell.value || 0)
    )));
}

export function isBoardValid(board: BoardCell[][]) {
  let isValid = true;
  board.forEach(row => {
    for (let i = 0; i < row.length; i++) {
      if (+row[i].value < 1 || +row[i].value > 9) {
        isValid = false;
        break;
      }
    }
  })
  return isValid;
}

export function getBoard(data: Board): BoardCell[][] {
  return data.map(row => (
    row.map(cell => (
      {
        value: cell || '',
        readOnly: !!cell,
      }
    ))
  ))
}
