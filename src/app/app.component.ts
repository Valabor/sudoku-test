import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { BehaviorSubject, catchError, delay, map, of, tap } from 'rxjs';
import { SudokuService } from './services/sudoku.service';
import { Board, BoardCell, Difficulty, Status } from './models/sudoku.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { ButtonComponent } from './components/button/button.component';
import { SudokuStateService } from './services/sudoku-state.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgFor, FormsModule, LoaderComponent, ButtonComponent],
  providers: [SudokuService, SudokuStateService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  tempData: Board = [];
  boardData: BoardCell[][] = [];
  updatedBoard: Board = [];
  status: Status | undefined = 'unsolved';
  constructor(
    private sudokuService: SudokuService,
    public state: SudokuStateService
  ) { }

  ngOnInit(): void {
    this.getDataForBoard()
  }

  getDataForBoard(difficulty?: Difficulty) {
    this.state.isLoading$.next(true);
    this.sudokuService.getBoard(difficulty).pipe(
      tap((data: Board) => {
        if (this.state.initData$.value) {
          this.state.initData$.next(data)
        }
        this.state.boardData$.next(this.getBoard(data));
      }),
      untilDestroyed(this),
      delay(500),
      catchError(() => {
        this.state.isLoading$.next(false);
        return of([]);
      })
    ).subscribe();
  }

  validateBoard() {
    this.sudokuService.validateBoard(this.tempData).pipe(
      untilDestroyed(this),
      tap(data => this.status = data.status)
    ).subscribe();
  }
  solveBoard() {
    this.sudokuService.solveBoard(this.getSolution(this.state.boardData$.value)).pipe(
      untilDestroyed(this),
      catchError(() => {
        this.state.isLoading$.next(false);
        return of(null);
      })
    ).subscribe(data => {
      if (data?.status === 'solved') {
        this.state.boardData$.next(this.getBoard(data.solution));
      }
      this.status = data?.status
    });
  }
  getSolution(board: BoardCell[][]): Board {
    return board.map(row => (
      row.map((cell) => (+cell.value || 0)
      )));
  }
  getBoard(data: Board): BoardCell[][] {
    return data.map(row => (
      row.map(cell => (
        {
          value: cell || '',
          readOnly: !!cell,
        }
      ))
    ))
  }
  resetBoard() {
    this.state.boardData$.next(this.getBoard(this.state.initData$.value));
  }
}
