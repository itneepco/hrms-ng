import { GroupRoster } from './../models/group-wise-roster';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseURL } from 'src/app/shared/config/baseUrl';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Injectable({
  providedIn: "root"
})
export class GroupRosterService {
  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  getUrl() {
    return baseURL + "api/attendance/project";
  }

  getShiftRoster(
    projectId: number,
    from_date: Date,
    to_date: Date
  ): Observable<GroupRoster[]> {
    return this.http
      .get<GroupRoster[]>(
        `${this.getUrl()}/${projectId}/group-roster?from_date=${from_date}&to_date=${to_date}`
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  addShiftRoster(projectId: number, roster: GroupRoster) {
    return this.http.post(`${this.getUrl()}/${projectId}/group-roster`, roster)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
