import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { baseURL } from './../../shared/config/baseUrl';
import { TrainingInstitute } from './../models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingInstituteService {
  training_institute_url = baseURL + 'api/training/institute'

  constructor(private http: HttpClient, private handler: ErrorHandlerService) { }

  getTrainingInstitutes() {
    return this.http.get<TrainingInstitute[]>(this.training_institute_url)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getInstitutesPaginate(pageIndex: number, pageSize: number) {
    return this.http.get<TrainingInstitute[]>(this.training_institute_url + "/paginate?pageIndex=" + pageIndex + "&pageSize=" + pageSize)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addTrainingInstitute(institute: TrainingInstitute) {
    return this.http.post(this.training_institute_url, institute)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  editTrainingInstitute(id: number, institute: TrainingInstitute) {
    return this.http.put(`${this.training_institute_url}/${id}`, institute)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  deleteTrainingInstitute(id: number) {
    return this.http.delete(`${this.training_institute_url}/${id}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
