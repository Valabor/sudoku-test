import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { SudokuFacadeService } from '../../services/sudoku-facade.secvice';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
  ],
  providers: [SudokuFacadeService],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() isDisabled: boolean | null = false;
  constructor(
    public sudokuFacade: SudokuFacadeService
    ) { }
}
