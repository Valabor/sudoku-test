import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { SudokuFacadeService } from '../../services/sudoku-facade.service';
import { provideHttpClient } from '@angular/common/http';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let sudokuFacadeService: SudokuFacadeService;
  let mockSudokuFacadeService;

  beforeEach(async () => {
    // mockSudokuFacadeService = jasmine.createSpyObj(['getDataForBoard']);
    // mockSudokuFacadeService.getCustomer.and.returnValue([]);
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

  it('should call the SudokuFacadeService on button click', fakeAsync( () => {
    fixture.detectChanges();
   
    spyOn(component.sudokuFacade, 'getDataForBoard'); //method attached to the click.
   
    const button = fixture.debugElement.nativeElement.querySelector('.like-link');
    button.click();
   
    tick();
   
    fixture.detectChanges();
    expect(component.sudokuFacade.getDataForBoard).toHaveBeenCalled();
}));
});