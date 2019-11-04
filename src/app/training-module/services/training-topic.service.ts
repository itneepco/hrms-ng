import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { TrainingTopic } from '../models/training';
import { baseURL } from './../../shared/config/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class TrainingTopicService {
  private topic_url = baseURL + 'api/training/info';

  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  getTrainingTopics(trainingId: number): Observable<TrainingTopic[]> {
    return this.http.get<TrainingTopic[]>(`${this.topic_url}/${trainingId}/topic`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }

  addTrainingTopic(trainingId: number, trainingTopic: TrainingTopic) {
    return this.http.post(`${this.topic_url}/${trainingId}/topic`, trainingTopic)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }

  editTrainingTopic(trainingId: number, topicId: number, trainingTopic: TrainingTopic) {
    return this.http.put(`${this.topic_url}/${trainingId}/topic/${topicId}`, trainingTopic)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }

  deleteTrainingTopic(trainingId: number, topicId: number) {
    return this.http.delete(`${this.topic_url}/${trainingId}/topic/${topicId}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      );
  }
}
