import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuStateService } from './services/sudoku-state.service';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { SudokuFacadeService } from './services/sudoku-facade.secvice';
import { BoardComponent } from './components/board/board.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SnackbarComponent,
    HeaderComponent,
    BoardComponent,
    FooterComponent
  ],
  providers: [SudokuStateService, SudokuFacadeService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements  OnInit {
  constructor(
    public state: SudokuStateService,
    public sudokuFacade: SudokuFacadeService
  ) { }
  ngOnInit(): void {
    this.sudokuFacade.getDataForBoard();
  }
}
