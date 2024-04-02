import { Injectable } from "@angular/core";
import { Board, BoardResponce, Difficulty, SolveResponse, ValidateResponse } from "../models/sudoku.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  private baseUrl = 'https://sugoku.onrender.com';

  constructor(private http: HttpClient) {}

  getBoard(difficulty?: Difficulty): Observable<Board> {
    const params = { params: new HttpParams().set('difficulty', difficulty || 'random') };
    return this.http.get<BoardResponce>(`${this.baseUrl}/board`, params).pipe(map(data => data.board));
  }

  validateBoard(board: Board): Observable<ValidateResponse> {
    let params = new HttpParams().append('board', JSON.stringify(board))
    return this.http.post<ValidateResponse>(`${this.baseUrl}/validate1`, params);
  }

  solveBoard(board: Board): Observable<SolveResponse> {
    let params = new HttpParams().append('board', JSON.stringify(board));
    return this.http.post<SolveResponse>(`${this.baseUrl}/solve`, params);
  }
}