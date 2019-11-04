import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NEEDS_CREATED, NEEDS_SUBMITTED } from '../models/training-global-codes';
import { baseURL } from './../../shared/config/baseUrl';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { NEEDS_RECOMMENDED, NEEDS_RETURNED } from './../models/training-global-codes';
import { TrainingNeedInfo } from './../models/training-needs';

@Injectable({
  providedIn: 'root'
})
export class NeedsInfoService {
  private needsInfo = baseURL + 'api/training/needs-info';

  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  // Get all training needs info for the specified employee
  getNeedInfos(empCode: string): Observable<TrainingNeedInfo[]> {
    return this.http.get<TrainingNeedInfo[]>(`${this.needsInfo}/employee/${empCode}`)
    .pipe(
      catchError(err => this.handler.handleError(err))
    );
  }

  // Get all pending request for the specified employee (Training needs workflow)
  getPendingNeeds(empCode: string) {
    return this.http.get<TrainingNeedInfo[]>(`${this.needsInfo}/pending/${empCode}`)
    .pipe(
      catchError(err => this.handler.handleError(err))
    );
  }

  // Get all pending request count for the specified employee (Training needs workflow)
  pendingNeedsCount(empCode: string): Observable<number> {
    return this.http.get<number>(`${this.needsInfo}/pending/${empCode}/count`)
    .pipe(
      catchError(err => this.handler.handleError(err))
    );
  }

  // Get the training needs info based on the training need info id
  getNeedInfo(id: number) {
    return this.http.get<TrainingNeedInfo>(`${this.needsInfo}/${id}`)
    .pipe(
      catchError(err => this.handler.handleError(err))
    );
  }

  getGrade(grade: string) {
    switch (grade) {
      case 'E': return 'Executive';
      case 'S': return 'Supervisor';
      case 'W': return 'Workman';
    }
  }

  getNeedsInfoStatus(status) {
    switch (status) {
      case NEEDS_CREATED: return 'Pending';
      case NEEDS_SUBMITTED: return 'Submitted';
      case NEEDS_RETURNED: return 'Returned';
      case NEEDS_RECOMMENDED: return 'Recommended';
    }
  }
}
