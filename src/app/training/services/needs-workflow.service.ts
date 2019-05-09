import { baseURL } from './../../shared/config/baseUrl';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NeedsWorkflowService {
  private needWorkflowUrl = baseURL + 'api/training/needs-workflow';

  constructor(private http: HttpClient, private handler: ErrorHandlerService) { }

  processWorkflow(needsInfoId, workflow) {
    return this.http.post(`${this.needWorkflowUrl}/${needsInfoId}/actions`, workflow)
    .pipe(
      catchError(err => this.handler.handleError(err))
    );
  }
}
