import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { LeaveLedger } from '../models/ledger';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private ledgerUrl = baseURL + "api/leave/ledger/"

  constructor(private http: HttpClient, private handler: ErrorHandlerService) { }

  searchEmployee(empCode: string, pageIndex: number, pageSize: number) {
    return this.http.get(this.ledgerUrl + `employee/${empCode}` + "?pageIndex=" + 
      pageIndex + "&pageSize=" + pageSize)
        .pipe(
          catchError(err => this.handler.handleError(err))
        )
  }

  deleteLedger(id: number) {
    return this.http.delete(this.ledgerUrl + id)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addLedger(ledger: LeaveLedger) {
    return this.http.post(this.ledgerUrl, ledger)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  updateLedger(id: number, ledger: LeaveLedger) {
    return this.http.put(this.ledgerUrl + id, ledger)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getLeaveStatus(empCode: string, year: string): Observable<any> {
    return this.http.get(baseURL + "api/leave/status/" + `${empCode}/${year}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
