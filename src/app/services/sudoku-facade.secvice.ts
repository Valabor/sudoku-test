import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap, delay, catchError, of } from 'rxjs';
import { getBoard, getSolution, isBoardValid } from '../helpers/helpers';
import { Difficulty, Board } from '../models/sudoku.model';
import { SudokuService } from './sudoku.service';
import { SudokuStateService } from './sudoku-state.service';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class SudokuFacadeService {
  constructor(
    private sudokuService: SudokuService,
    public state: SudokuStateService
  ) {
    this.state.isError$.subscribe();
  }
  
  getDataForBoard(difficulty?: Difficulty) {
    this.state.isLoading$.next(true);
    this.sudokuService.getBoard(difficulty).pipe(
      tap((data: Board) => {
        if (this.state.initData$.value) {
          this.state.initData$.next(data)
        }
        this.state.boardData$.next(getBoard(data));
      }),
      untilDestroyed(this),
      delay(500),
      catchError(() => {
        this.state.isLoading$.next(false);
        this.state.isError$.next({ visible: true });
        return of([]);
      })
    ).subscribe();
  }

  validateBoard() {
    this.state.isLoading$.next(true);
    this.sudokuService.validateBoard(getSolution(this.state.boardData$.value)).pipe(
      untilDestroyed(this),
      delay(500),
      tap(data => this.state.status$ = data.status),
      catchError(() => {
        this.state.isLoading$.next(false);
        this.state.isError$.next({ visible: true });
        return of(null);
      })
    ).subscribe(() => this.state.isLoading$.next(false));
  }

  solveBoard() {
    if (isBoardValid(this.state.boardData$.value)) {
      this.state.isLoading$.next(true);
      this.sudokuService.solveBoard(getSolution(this.state.boardData$.value)).pipe(
        untilDestroyed(this),
        delay(500),
        catchError(() => {
          this.state.isLoading$.next(false);
          return of(null);
        })
      ).subscribe(data => {
        if (data?.status === 'solved') {
          this.state.boardData$.next(getBoard(data.solution));
        }
        this.state.status$ = data?.status
      });
    } else {
      this.state.isError$.next({visible: true, message: "Please check cells before solving!"});
    }
  }

  resetBoard() {
    this.state.boardData$.next(getBoard(this.state.initData$.value));
  }
}