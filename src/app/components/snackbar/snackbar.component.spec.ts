import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from './snackbar.component';
import { By } from '@angular/platform-browser';
import { SudokuStateService } from '../../services/sudoku-state.service';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;
  let sudokuStateService: SudokuStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SnackbarComponent],
      providers: [SudokuStateService]
    }).compileComponents();
    sudokuStateService = TestBed.inject(SudokuStateService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide the snackbar after 3 seconds when visible is true', fakeAsync(() => {
    const snackbarElement = fixture.debugElement.query(By.css('#snackbar'));

    sudokuStateService.showError({visible: true});

    tick(3500);

    expect(snackbarElement.nativeElement.classList.contains('show')).toBe(false);
  }));

  it('should not show the snackbar when visible is false', () => {
    const snackbarElement = fixture.debugElement.query(By.css('#snackbar'));
    expect(snackbarElement.nativeElement.classList.contains('show')).toBe(false);

    sudokuStateService.showError({visible: false});

    expect(snackbarElement.nativeElement.classList.contains('show')).toBe(false);
  });
});