import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from './../../shared/config/baseUrl';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { TrainingNeedInfo } from './../models/training-needs';

@Injectable({
  providedIn: 'root'
})
export class NeedsInfoService {
  private ex_need_url = baseURL + 'api/training/needs-info'

  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  getTrainigNeeds(empCode: string, year?: string): Observable<TrainingNeedInfo[]> {
    return this.http.get<TrainingNeedInfo[]>(`${this.ex_need_url}/employee/${empCode}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getGrade(grade: string) {
    switch(grade) {
      case 'E': return "Executive"
      case 'S': return "Supervisor"
      case 'W': return "Workman"
    }

  }
}
