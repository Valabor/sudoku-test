import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SudokuFacadeService } from '../../services/sudoku-facade.secvice';
import { SudokuStateService } from '../../services/sudoku-state.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
  ],
  providers: [SudokuFacadeService, SudokuStateService],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor(
    public sudokuFacade: SudokuFacadeService,
    public state: SudokuStateService
    ) {}
}
