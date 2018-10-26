import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveStatementService {
  constructor(private http: HttpClient,
    private handler: ErrorHandlerService,
    private auth: AuthService) { }

  getUrl() {
    return baseURL + `api/projects/${this.auth.currentUser.project}/approved-leave`
  }

  getStatement(from_date: string, to_date?: string): Observable<any> {
    return this.http.get<any>(`${this.getUrl()}?from_date=${from_date}&to_date=${to_date}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
