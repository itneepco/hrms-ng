import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  getCalendarEvents() {
    return this.http.get<Holiday[]>(this.getUrl() + 'calendar')
      .pipe(
        map(holidays => {
          return holidays.map(holiday => {
            let calEvent = {
              title: holiday.name,
              start: new Date(holiday.day),
              end: new Date(holiday.day),
              color: holiday.type == "RH" ? this.colors.yellow : this.colors.blue,
              type: holiday.type
            }
            return calEvent
          })
        }),
        catchError(err => this.handler.handleError(err))
      )
  }

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };
}

