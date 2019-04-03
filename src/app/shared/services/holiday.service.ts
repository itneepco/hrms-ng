import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from '../../auth/services/auth.service';
import { baseURL } from '../config/baseUrl';
import { Holiday } from '../models/holiday';
import { CALENDAR_COLORS } from './../models/global-codes';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  constructor(private http: HttpClient, 
    private handler: ErrorHandlerService,
    private auth: AuthService) {
  }

  getUrl() {
    return baseURL + `api/projects/${this.auth.currentUser.project}/holidays/`
  }

  getHolidays(pageIndex: number, pageSize: number): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.getUrl() + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize)
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

  // Gets the holiday list for displaying in the calendar
  getCalendarEvents() {
    return this.http.get<Holiday[]>(baseURL + `api/projects/${this.auth.currentUser.project}/calendar`)
      .pipe(
        map(holidays => {
          return holidays.map(holiday => {
            let calEvent = {
              title: holiday.name,
              start: new Date(holiday.day),
              end: new Date(holiday.day),
              color: holiday.type == "RH" ? CALENDAR_COLORS.yellow : CALENDAR_COLORS.blue,
              type: holiday.type
            }
            return calEvent
          })
        }),
        catchError(err => this.handler.handleError(err))
      )
  }
}

