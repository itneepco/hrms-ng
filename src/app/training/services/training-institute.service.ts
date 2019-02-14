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
}
