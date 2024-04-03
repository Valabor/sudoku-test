import { Injectable } from "@angular/core";
import { Board, BoardResponce, Difficulty, SolveResponse, ValidateResponse } from "../models/sudoku.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class SudokuService {

  constructor(private http: HttpClient) {}

  getBoard(difficulty?: Difficulty): Observable<Board> {
    const params = { params: new HttpParams().set('difficulty', difficulty || 'random') };
    return this.http.get<BoardResponce>(`${environment.apiUrl}/board`, params).pipe(map(data => data.board));
  }

  validateBoard(board: Board): Observable<ValidateResponse> {
    let params = new HttpParams().append('board', JSON.stringify(board))
    return this.http.post<ValidateResponse>(`${environment.apiUrl}/validate`, params);
  }

  solveBoard(board: Board): Observable<SolveResponse> {
    let params = new HttpParams().append('board', JSON.stringify(board));
    return this.http.post<SolveResponse>(`${environment.apiUrl}/solve`, params);
  }
}