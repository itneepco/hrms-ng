import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { Participant, TrainingAttendance } from './../models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingParticipantService {

  private participant_url = baseURL + 'api/training/info'

  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  getParticipants(trainingId: number): Observable<Participant[]> {
    return this.http.get<Participant[]>(`${this.participant_url}/${trainingId}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addParticipant(trainingId: number, emp_code: string) {
    return this.http.post(`${this.participant_url}/${trainingId}/participant`, {emp_code})
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  editParticipant(trainingId: number, participantId: number, emp_code: string) {
    return this.http.put(`${this.participant_url}/${trainingId}/participant/${participantId}`, {emp_code})
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  deleteParticipant(trainingId: number, participantId: number) {
    return this.http.delete(`${this.participant_url}/${trainingId}/participant/${participantId}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  markPresent(trainingId: number, attendance: TrainingAttendance[]) {
    return this.http.put(`${this.participant_url}/${trainingId}/participant/attendance/mark`, attendance)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
