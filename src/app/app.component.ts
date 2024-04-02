import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { ButtonComponent } from './components/button/button.component';
import { SudokuStateService } from './services/sudoku-state.service';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { BoardComponent } from './components/board/board.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoaderComponent,
    ButtonComponent,
    SnackbarComponent,
    HeaderComponent,
    BoardComponent,
    FooterComponent
  ],
  providers: [SudokuStateService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    public state: SudokuStateService
  ) {
    this.state.isError$.subscribe();
  }
}
