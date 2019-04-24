import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { ExecutiveNeed } from '../models/training-needs';
import { baseURL } from './../../shared/config/baseUrl';
import {
  DESIRABLE_NEED_TYPE,
  ESSENTIAL_NEED_TYPE,
  LONG_TERM_DURATION,
  SHORT_TERM_DURATION,
} from './../models/training-global-codes';

interface ExecutiveNeedResult {
  data: ExecutiveNeed[]
  finYear: string
}

@Injectable({
  providedIn: 'root'
})
export class ExecutiveNeedService {
  private topic_url = baseURL + 'api/training/executive-needs'

  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  getTrainigNeeds(empCode: string, year?: string): Observable<ExecutiveNeedResult> {
    return this.http.get<ExecutiveNeedResult>(`${this.topic_url}/employee/${empCode}?year=${year}`)
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

  getDuration(code: string) {
    if(code == SHORT_TERM_DURATION)
      return "Short Term"
    if(code == LONG_TERM_DURATION)
      return "Long Term"
  }

  getNeedType(code: string) {
    if(code == ESSENTIAL_NEED_TYPE)
      return "Essential"
    if(code == DESIRABLE_NEED_TYPE)
      return "Desirable"  
  }
}