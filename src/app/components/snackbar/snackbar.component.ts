import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
  @Input() visible: boolean | undefined = false;
  @Input() message: string | undefined = 'Something went wrong! Try again later!';

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'].currentValue) {
      setTimeout(() => {
        this.visible = false;
        this.cd.detectChanges();
      }, 3000);
    }
  }
}
