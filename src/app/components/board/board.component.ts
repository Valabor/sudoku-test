import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SudokuStateService } from '../../services/sudoku-state.service';
import { SudokuFacadeService } from '../../services/sudoku-facade.service';
import { LoaderComponent } from '../loader/loader.component';
import { BoardCell } from '../../models/sudoku.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    FormsModule,
    LoaderComponent
  ],
  providers: [SudokuStateService, SudokuFacadeService],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {

  @Input() board: BoardCell[][] | null = [];
  @Input() isLoading: boolean | null = false;
  
  constructor(
    public readonly state: SudokuStateService,
    private sudokuFacade: SudokuFacadeService
    ) {
  }
}
