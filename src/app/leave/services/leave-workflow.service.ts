import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { baseURL } from '../../shared/config/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class LeaveWorkflowService {
  workflowActionUrl = baseURL + 'api/leave/workflow'

  constructor(private http: HttpClient, private handler: ErrorHandlerService) { }

  getWorkflowActions() {
    return this.http.get(this.workflowActionUrl)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
