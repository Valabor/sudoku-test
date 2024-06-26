import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, of, tap } from 'rxjs';
import { Board, BoardCell, Difficulty, Error, Status } from '../models/sudoku.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class SudokuStateService {
  initData$ = new BehaviorSubject<Board>([]);
  boardData$ = new BehaviorSubject<BoardCell[][]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  isError$ = new BehaviorSubject<Error>({visible: false});
  status$: Status | undefined;

  constructor() {
    this.boardData$.pipe(
      untilDestroyed(this),
    ).subscribe(() => this.isLoading$.next(false));
  }

  showError(error: Error) {
    this.isError$.next(error);
    setTimeout(() => {
      this.isError$.next({visible: false});
    }, 3000);
  }
}
