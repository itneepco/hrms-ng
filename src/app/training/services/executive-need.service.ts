import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { ExecutiveNeed } from '../models/training-needs';
import { baseURL } from './../../shared/config/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ExecutiveNeedService {
  private topic_url = baseURL + 'api/training/executive-needs'

  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  getTrainigNeeds(): Observable<ExecutiveNeed[]> {
    return this.http.get<ExecutiveNeed[]>(this.topic_url)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addExecutiveNeed(trainingNeed: ExecutiveNeed) {
    return this.http.post(this.topic_url, trainingNeed)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  editExecutiveNeed(executiveNeedId: number, trainingNeed: ExecutiveNeed) {
    return this.http.put(`${this.topic_url}/${executiveNeedId}`, trainingNeed)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  deleteExecutiveNeed(executiveNeedId: number) {
    return this.http.delete(`${this.topic_url}/${executiveNeedId}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}