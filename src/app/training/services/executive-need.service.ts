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

@Injectable({
  providedIn: 'root'
})
export class ExecutiveNeedService {
  private ex_need_url = baseURL + 'api/training/needs-info';

  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  getTrainigNeeds(needInfoId: number): Observable<ExecutiveNeed[]> {
    return this.http.get<ExecutiveNeed[]>(`${this.ex_need_url}/${needInfoId}/executive-needs`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }

  addExecutiveNeed(needInfoId: number, trainingNeed: ExecutiveNeed) {
    return this.http.post(`${this.ex_need_url}/${needInfoId}/executive-needs`, trainingNeed)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }

  editExecutiveNeed(needInfoId: number, executiveNeedId: number, trainingNeed: ExecutiveNeed) {
    return this.http.put(`${this.ex_need_url}/${needInfoId}/executive-needs/${executiveNeedId}`, trainingNeed)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }

  updateNeedRemarks(needInfoId: number, executiveNeedId: number, remarks) {
    return this.http.put(`${this.ex_need_url}/${needInfoId}/executive-needs/${executiveNeedId}/remarks`, remarks)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }

  deleteExecutiveNeed(needInfoId: number, executiveNeedId: number) {
    return this.http.delete(`${this.ex_need_url}/${needInfoId}/executive-needs/${executiveNeedId}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }

  getDuration(code: string) {
    if (code == SHORT_TERM_DURATION) {
      return 'Short Term';
    }
    if (code == LONG_TERM_DURATION) {
      return 'Long Term';
    }
  }

  getNeedType(code: string) {
    if (code == ESSENTIAL_NEED_TYPE) {
      return 'Essential';
    }
    if (code == DESIRABLE_NEED_TYPE) {
      return 'Desirable';
    }
  }
}
