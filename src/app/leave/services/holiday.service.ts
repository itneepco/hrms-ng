import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../../auth/services/auth.service';
import { baseURL } from '../../shared/config/baseUrl';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Holiday } from '../shared/holiday';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  constructor(private http: HttpClient, 
    private handler: ErrorHandlerService,
    private auth: AuthService) {
  }

  getUrl() {
    return baseURL + 'api/projects/' + this.auth.currentUser.project + '/holidays/'
  }

  getHolidays(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.getUrl())
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addHoliday(holiday: Holiday) {
    return this.http.post(this.getUrl(), holiday)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  editHoliday(id: number, holiday: Holiday) {
    console.log(holiday)
    return this.http.put(this.getUrl() + id, holiday)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  deleteHoliday(id: number) {
    return this.http.delete(this.getUrl() + id)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
