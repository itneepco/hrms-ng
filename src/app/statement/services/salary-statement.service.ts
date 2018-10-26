import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { catchError } from 'rxjs/operators';
import { baseURL } from '../../shared/config/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class SalaryStatementService {
  url = baseURL + 'api/pay-image'

  constructor(private http: HttpClient,
    private handler: ErrorHandlerService
  ) { }

  getStatement(empCode: string, yymm?: string): Observable<any> {
    let url = `${this.url}/${empCode}`
    if(yymm) { 
      url = url + `?yymm=${yymm}`
    }
    
    return this.http.get<any>(url)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
