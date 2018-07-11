import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { baseURL } from './../config/baseUrl';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private handler: ErrorHandlerService) { }

  getUrl() {
    return baseURL + 'api/projects'
  }

  getProjects() {
    return this.http.get(this.getUrl())
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
