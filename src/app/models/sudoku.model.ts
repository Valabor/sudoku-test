export type Difficulty = 'easy' | 'medium' | 'hard';
export type Status = 'solved' | 'broken' | 'unsolvable' | 'unsolved';
export type Board = number[][];
export interface BoardResponce {
  board: Board;
}

export type SudokuRequest = {
  board: Board;
};

export interface BoardCell {
  value: string | number,
  readOnly: boolean,
}

export type SolveResponse = {
  difficulty: Difficulty;
  solution: Board;
  status: Status;
};

export type ValidateResponse = {
  status: 'solved' | 'broken';
};
