import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { baseURL } from './../../shared/config/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class TrainingInstituteService {
  training_institute_url = baseURL + 'training/institute'

  constructor(private http: HttpClient, private handler: ErrorHandlerService) { }

  getTrainingInstitutes() {
    console.log("Hello world", this.training_institute_url)
    return this.http.get<any>(this.training_institute_url)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
