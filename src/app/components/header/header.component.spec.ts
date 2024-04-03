import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { SudokuFacadeService } from '../../services/sudoku-facade.secvice';
import { provideHttpClient } from '@angular/common/http';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let sudokuFacadeService: SudokuFacadeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [SudokuFacadeService, provideHttpClient()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    sudokuFacadeService = TestBed.inject(SudokuFacadeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the SudokuFacadeService on button click', () => {
    const spy = spyOn(sudokuFacadeService, 'getDataForBoard').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('.like-link');
    button.click();
    expect(spy).toHaveBeenCalled();
  });
});