import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { ErrorHandlerService } from "../../shared/services/error-handler.service";
import {
  TrainingForm,
  TrainingInfo,
  TrainingInstitute
} from "../models/training";
import { IN_HOUSE_TRAINING } from "../models/training-global-codes";
import { TrainingLabel } from "../models/training-needs";
import { baseURL } from "./../../shared/config/baseUrl";
import {
  EXTERNAL_TRAINING,
  TRAINING_COMPLETED,
  TRAINING_CREATED,
  TRAINING_PUBLISHED
} from "./../models/training-global-codes";

@Injectable({
  providedIn: "root"
})
export class TrainingService {
  private training_url = baseURL + "api/training/info";
  private employee_url = baseURL + "api/training/employee";

  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  uploadOrder(id: number, order) {
    const formData = new FormData();
    // formData.append('code', data.code)
    // formData.append('day', data.day)
    formData.append("order", order);

    return this.http
      .post(`${this.training_url}/${id}/upload-order`, formData, {
        reportProgress: true,
        observe: "events"
      })
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  downloadOrder(id: number) {
    return this.http
      .get(`${this.training_url}/${id}/download-order`, {
        responseType: "blob"
      })
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getEmployeeTrainings(
    pageIndex: number,
    pageSize: number,
    empCode: string
  ): Observable<TrainingInfo[]> {
    return this.http
      .get<TrainingInfo[]>(
        `${this.training_url}/employee/${empCode}` +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getTrainingInfos(
    pageIndex: number,
    pageSize: number
  ): Observable<TrainingInfo[]> {
    return this.http
      .get<TrainingInfo[]>(
        this.training_url + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getPastTrainings(
    pageIndex: number,
    pageSize: number
  ): Observable<TrainingInfo[]> {
    return this.http
      .get<TrainingInfo[]>(
        this.training_url +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize +
          "&status=archived"
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  addTrainingInfo(trainingInfo: TrainingForm) {
    return this.http
      .post(this.training_url, trainingInfo)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  editTrainingInfo(id: number, trainingInfo: TrainingForm) {
    return this.http
      .put(`${this.training_url}/${id}`, trainingInfo)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  deleteTrainingInfo(id: number) {
    return this.http
      .delete(`${this.training_url}/${id}`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  publishTraining(id: number) {
    return this.http
      .put(`${this.training_url}/${id}/publish`, { status: TRAINING_PUBLISHED })
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  markTrainingCompleted(id: number) {
    return this.http
      .put(`${this.training_url}/${id}/mark-complete`, {
        status: TRAINING_COMPLETED
      })
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  // For Employee API endpoint *** start ***
  getMyTrainings(
    pageIndex: number,
    pageSize: number
  ): Observable<TrainingInfo[]> {
    return this.http
      .get<TrainingInfo[]>(
        `${this.employee_url}/my-training` +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  feedbackPending(
    pageIndex: number,
    pageSize: number
  ): Observable<any> {
    return this.http
      .get<any>(
        `${this.employee_url}/my-feedback` +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize +
          "&status=pending"
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  feedbackPendingCount(): Observable<number> {
    return this.http
      .get<number>(`${this.employee_url}/my-feedback/count`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  feedbackSubmitted(
    pageIndex: number,
    pageSize: number
  ): Observable<TrainingInfo[]> {
    return this.http
      .get<TrainingInfo[]>(
        `${this.employee_url}/my-feedback` +
          "?pageIndex=" +
          pageIndex +
          "&pageSize=" +
          pageSize
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getTrainingLabels(): Observable<TrainingLabel[]> {
    return this.http
      .get<TrainingLabel[]>(`${this.employee_url}/training-label`)
      .pipe(catchError(err => this.handler.handleError(err)));
  }

  getTrainingInstitute(instituteId: number): Observable<TrainingInstitute> {
    return this.http
      .get<TrainingInstitute>(
        `${this.employee_url}/training-institute/${instituteId}`
      )
      .pipe(catchError(err => this.handler.handleError(err)));
  }
  // For Employee API endpoint *** end ***

  getType(code: string) {
    if (code === IN_HOUSE_TRAINING) {
      return "In House";
    }
    if (code === EXTERNAL_TRAINING) {
      return "External";
    }
  }

  getStatus(code: string) {
    if (code === TRAINING_COMPLETED) {
      return "Completed";
    }
    if (code === TRAINING_PUBLISHED) {
      return "Active";
    }
    if (code === TRAINING_CREATED) {
      return "Pending";
    }
  }
}
