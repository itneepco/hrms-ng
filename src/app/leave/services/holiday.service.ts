import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Holiday } from '../shared/holiday';
import { AuthService } from './../../auth/services/auth.service';
import { baseURL } from './../../shared/config/baseUrl';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  rest_url: string

  constructor(private http: HttpClient, 
    private handler: ErrorHandlerService,
    private auth: AuthService) {
    this.rest_url = baseURL + 'project/' + this.auth.currentUser.project + '/holidays'
  }

  getHolidays(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.rest_url)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
