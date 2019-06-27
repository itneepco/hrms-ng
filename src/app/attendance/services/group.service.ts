import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

import { baseURL } from './../../shared/config/baseUrl';
import { Group } from './../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient,
    private handler: ErrorHandlerService) {
  }

  getUrl() {
    return baseURL + 'api/attendance/project'
  }

  getGroups(projectId: number): Observable<Group[]> {
    console.log(`${this.getUrl()}/${projectId}/groups`)
    return this.http.get<Group[]>(`${this.getUrl()}/${projectId}/groups`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addGroup(projectId: number, group: Group) {
    return this.http.post(`${this.getUrl()}/${projectId}/groups`, group)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  editGroup(projectId: number, id: number, group: Group) {
    return this.http.put(`${this.getUrl()}/${projectId}/groups/${id}`, group)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  deleteGroup(projectId: number, id: number) {
    return this.http.delete(`${this.getUrl()}/${projectId}/groups/${id}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getGroup(projectId: number, id: number) {
    return this.http.get<Group>(`${this.getUrl()}/${projectId}/groups/${id}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  isGeneralGroup(val: boolean) {
    if(val) {
      return "YES"
    }
    else {
      return "NO"
    }
  }
}
