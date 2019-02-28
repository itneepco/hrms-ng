import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TrainingFeedback } from '../models/training';
import { baseURL } from './../../shared/config/baseUrl';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedback_url = baseURL + 'api/training/info'

  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  getFeedbacks(trainingId: number): Observable<TrainingFeedback[]> {
    return this.http.get<TrainingFeedback[]>(`${this.feedback_url}/${trainingId}/feedback`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addFeedback(trainingId: number, feedback: TrainingFeedback) {
    return this.http.post(`${this.feedback_url}/${trainingId}/feedback`, feedback)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  editFeedback(trainingId: number, feedbackId: number, feedback: TrainingFeedback) {
    return this.http.put(`${this.feedback_url}/${trainingId}/feedback/${feedbackId}`, feedback)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  deleteFeedback(trainingId: number, feedbackId: number) {
    return this.http.delete(`${this.feedback_url}/${trainingId}/feedback/${feedbackId}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
