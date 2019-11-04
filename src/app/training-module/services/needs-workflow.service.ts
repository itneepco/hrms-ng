import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { baseURL } from './../../shared/config/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class NeedsWorkflowService {
  private needWorkflowUrl = baseURL + 'api/training/needs-info';

  constructor(private http: HttpClient, private handler: ErrorHandlerService) { }

  processWorkflow(needInfoId: number, workflow) {
    return this.http.post(`${this.needWorkflowUrl}/${needInfoId}/workflow`, workflow)
    .pipe(
      catchError(err => this.handler.handleError(err))
    );
  }
}
