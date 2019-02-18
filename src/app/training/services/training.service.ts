import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { TrainingForm, TrainingInfo } from '../models/training';
import { IN_HOUSE_TRAINING } from '../models/training-global-codes';
import { baseURL } from './../../shared/config/baseUrl';
import { EXTERNAL_TRAINING, TRAINING_PUBLISHED, TRAINING_COMPLETED, TRAINING_CREATED } from './../models/training-global-codes';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private training_url = baseURL + 'api/training/info'
  private my_training_url = baseURL + 'api/training/employee'

  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  // upload(data) {
  //   let formData = new FormData()
  //   formData.append('code', data.code)
  //   formData.append('day', data.day)
  //   formData.append('report', data.report)

  //   return this.http.post(this.training_url, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   })
  //   .pipe(
  //     catchError(err => this.handler.handleError(err))
  //   )
  // }

  getTrainingInfos(pageIndex: number, pageSize: number): Observable<TrainingInfo[]> {
    return this.http.get<TrainingInfo[]>(this.training_url + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addTrainingInfo(trainingInfo: TrainingForm) {
    return this.http.post(this.training_url, trainingInfo)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  editTrainingInfo(id: number, trainingInfo: TrainingForm) {
    return this.http.put(`${this.training_url}/${id}`, trainingInfo)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  deleteTrainingInfo(id: number) {
    return this.http.delete(`${this.training_url}/${id}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  publishTraining(id: number) {
    return this.http.put(`${this.training_url}/${id}/publish`, { status: TRAINING_PUBLISHED })
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getMyTrainings(pageIndex: number, pageSize: number): Observable<TrainingInfo[]> {
    return this.http.get<TrainingInfo[]>(`${this.my_training_url}/my-training` + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getType(code: string) {
    if(code == IN_HOUSE_TRAINING) return "In House"
    if(code == EXTERNAL_TRAINING) return "External"
  }

  getStatus(code: string) {
    if(code == TRAINING_COMPLETED) return "Completed"
    if(code == TRAINING_PUBLISHED) return "Active"
    if(code == TRAINING_CREATED) return "Pending"
  }
  
}
