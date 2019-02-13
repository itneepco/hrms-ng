import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { baseURL } from './../../shared/config/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private training_url = 'http://10.3.0.64:4000/api/uploadomdaily'
  
  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  upload(data) {
    let formData = new FormData()
    formData.append('code', data.code)
    formData.append('day', data.day)
    formData.append('report', data.report)

    return this.http.post(this.training_url, formData, {
      reportProgress: true,
      observe: 'events'
    })
    .pipe(
      catchError(err => this.handler.handleError(err))
    )
  }

  
}
