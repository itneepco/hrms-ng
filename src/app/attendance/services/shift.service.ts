import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from 'src/app/shared/config/baseUrl';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

import { Shift } from '../models/shift';

@Injectable()
export class ShiftService {

  constructor(private http: HttpClient,
    private handler: ErrorHandlerService) {
  }

  getUrl() {
    return baseURL + 'api/attendance/project'
  }

  getShifts(projectId: number): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${this.getUrl()}/${projectId}/shifts`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addShift(projectId: number, shift: Shift) {
    return this.http.post(`${this.getUrl()}/${projectId}/shifts`, shift)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  editShift(projectId: number, id: number, shift: Shift) {
    return this.http.put(`${this.getUrl()}/${projectId}/shifts/${id}`, shift)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  deleteShift(projectId: number, id: number) {
    return this.http.delete(`${this.getUrl()}/${projectId}/shifts/${id}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getShift(projectId: number, id: number) {
    return this.http.get<Shift>(`${this.getUrl()}/${projectId}/shifts/${id}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
