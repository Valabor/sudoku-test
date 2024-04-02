import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SudokuStateService } from '../../services/sudoku-state.service';
import { SudokuFacadeService } from '../../services/sudoku-facade.secvice';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    FormsModule,
  ],
  providers: [SudokuStateService, SudokuFacadeService],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  
  constructor(
    public readonly state: SudokuStateService,
    private sudokuFacade: SudokuFacadeService
    ) {
  }

  ngOnInit(): void {
    this.sudokuFacade.getDataForBoard();
  }
}
