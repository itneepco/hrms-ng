import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { TrainingLabel } from '../models/training-needs';

@Injectable({
  providedIn: 'root'
})
export class TrainingLabelService {
  training_label_url = baseURL + 'api/training/label';

  constructor(private http: HttpClient, private handler: ErrorHandlerService) { }

  getTrainingLabels() {
    return this.http.get<TrainingLabel[]>(this.training_label_url)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }

  getLabelsPaginate(pageIndex: number, pageSize: number) {
    return this.http.get<TrainingLabel[]>(this.training_label_url + '/paginate?pageIndex=' + pageIndex + '&pageSize=' + pageSize)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }

  addTrainingLabel(label: TrainingLabel) {
    return this.http.post(this.training_label_url, label)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }

  editTrainingLabel(id: number, label: TrainingLabel) {
    return this.http.put(`${this.training_label_url}/${id}`, label)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }

  deleteTrainingLabel(id: number) {
    return this.http.delete(`${this.training_label_url}/${id}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }
}
