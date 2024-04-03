import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SudokuService } from './services/sudoku.service';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let sudokuService: SudokuService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [SudokuService, provideHttpClient()]
    }).compileComponents();
    sudokuService = TestBed.inject(SudokuService);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
