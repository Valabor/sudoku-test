import { TestBed } from '@angular/core/testing';
import { SudokuFacadeService } from './sudoku-facade.service';
import { SudokuService } from './sudoku.service';
import { SudokuStateService } from './sudoku-state.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { getBoard } from '../helpers/helpers';
import { Board, BoardCell } from '../models/sudoku.model';

describe('SudokuFacadeService', () => {
  let service: SudokuFacadeService;
  let sudokuServiceSpy: jasmine.SpyObj<SudokuService>;
  let stateServiceSpy: jasmine.SpyObj<SudokuStateService>;

  beforeEach(() => {
    sudokuServiceSpy = jasmine.createSpyObj('SudokuService', ['getBoard']);
    stateServiceSpy = jasmine.createSpyObj('SudokuStateService', ['isLoading$', 'initData$', 'boardData$', 'showError']);

    TestBed.configureTestingModule({
      providers: [
        SudokuFacadeService,
        { provide: SudokuService, useValue: sudokuServiceSpy },
        { provide: SudokuStateService, useValue: stateServiceSpy }
      ]
    });
    service = TestBed.inject(SudokuFacadeService);
  });

  /**
   *  checks that getDataForBoard correctly fetches board 
   *  data and updates the initData$ and boardData$ observables 
   *  when getBoard is successful.
  */
  it('should fetch board data', (done) => {
    const mockBoardData = [] as unknown as Board;
    stateServiceSpy.initData$ = new BehaviorSubject<Board>([]);;
    stateServiceSpy.isLoading$ = new BehaviorSubject<boolean>(false);
    stateServiceSpy.boardData$ = new BehaviorSubject<BoardCell[][]>([]);

    sudokuServiceSpy.getBoard.and.returnValue(of(mockBoardData).pipe(delay(500)));

    service.getDataForBoard();

    setTimeout(() => {
      expect(sudokuServiceSpy.getBoard).toHaveBeenCalled();
      expect(stateServiceSpy.isLoading$.value).toBe(true);
      expect(stateServiceSpy.initData$.value).toEqual(mockBoardData);
      expect(stateServiceSpy.boardData$.value).toEqual(getBoard(mockBoardData));
      expect(stateServiceSpy.showError).not.toHaveBeenCalled();
      done();
    }, 1000);
  });


  /**
   * checks that getDataForBoard correctly sets the error state when getBoard fails.
  */
  it('should show error on getBoard failure', (done) => {
    stateServiceSpy.initData$ = new BehaviorSubject<Board>([]);;
    stateServiceSpy.isLoading$ = new BehaviorSubject<boolean>(false);

    sudokuServiceSpy.getBoard.and.returnValue(throwError(()=>'TwainService test failure'));

    service.getDataForBoard();

    setTimeout(() => {
      expect(sudokuServiceSpy.getBoard).toHaveBeenCalled();
      expect(stateServiceSpy.isLoading$.value).toBe(false);
      expect(stateServiceSpy.showError).toHaveBeenCalled();
      done();
    }, 1000);
  });
});