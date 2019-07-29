import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from 'src/app/shared/config/baseUrl';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

import { AuthService } from './../../auth/services/auth.service';
import { GroupRoster } from './../models/group-wise-roster';

@Injectable({
  providedIn: "root"
})
export class GroupRosterService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService
  ) {}

  getUrl() {
    return baseURL + `api/attendance/project/${this.auth.currentUser.project}`;
  }

  getShiftRoster(
    from_date: string,
    to_date: string
  ): Observable<GroupRoster[]> {
    return this.http
      .get<GroupRoster[]>(
        `${this.getUrl()}/group-roster?from_date=${from_date}&to_date=${to_date}`
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  addShiftRoster(roster: GroupRoster) {
    return this.http
      .post(`${this.getUrl()}/group-roster`, roster)
      .pipe(catchError(err => this.handler.handleError(err)));
  }
}
