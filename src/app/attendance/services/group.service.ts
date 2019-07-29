import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

import { baseURL } from './../../shared/config/baseUrl';
import { Group } from './../models/group';

@Injectable({
  providedIn: "root"
})
export class GroupService {
  constructor(private http: HttpClient,
    private auth: AuthService,
    private handler: ErrorHandlerService) {}

  getUrl() {
    return baseURL + `api/attendance/project/${this.auth.currentUser.project}`;
  }

  getGroups(): Observable<Group[]> {
    return this.http
      .get<Group[]>(`${this.getUrl()}/groups`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  // Get all shift groups
  getShiftGroups(): Observable<Group[]> {
    return this.getGroups().pipe(
      map(groups => groups.filter(group => !group.is_general))
    );
  }

  // Get all general groups
  getGeneralGroups(): Observable<Group[]> {
    return this.getGroups().pipe(
      map(groups => groups.filter(group => group.is_general))
    );
  }

  addGroup(group: Group) {
    return this.http
      .post(`${this.getUrl()}/groups`, group)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  editGroup(id: number, group: Group) {
    return this.http
      .put(`${this.getUrl()}/groups/${id}`, group)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  deleteGroup(id: number) {
    return this.http
      .delete(`${this.getUrl()}/groups/${id}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getGroup(id: number) {
    return this.http
      .get<Group>(`${this.getUrl()}/groups/${id}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  isGeneralGroup(val: boolean) {
    if (val) {
      return "YES";
    } else {
      return "NO";
    }
  }
}
