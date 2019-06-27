import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

import { baseURL } from './../../shared/config/baseUrl';
import { WageMonth } from './../models/wage-month';

@Injectable({
  providedIn: 'root'
})
export class WageMonthService {

  constructor(private http: HttpClient,
    private handler: ErrorHandlerService) {
  }

  getUrl() {
    return baseURL + 'api/attendance/project'
  }

  getWageMonths(projectId: number): Observable<WageMonth[]> {
    return this.http.get<WageMonth[]>(`${this.getUrl()}/${projectId}/wage-months`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addWageMonth(projectId: number, shift: WageMonth) {
    return this.http.post(`${this.getUrl()}/${projectId}/wage-months`, shift)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  editWageMonth(projectId: number, id: number, shift: WageMonth) {
    return this.http.put(`${this.getUrl()}/${projectId}/wage-months/${id}`, shift)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  deleteWageMonth(projectId: number, id: number) {
    return this.http.delete(`${this.getUrl()}/${projectId}/wage-months/${id}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getWageMonth(projectId: number, id: number) {
    return this.http.get<WageMonth>(`${this.getUrl()}/${projectId}/wage-months/${id}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
