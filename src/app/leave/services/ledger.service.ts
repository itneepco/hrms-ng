import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { LeaveLedger } from '../../shared/models/ledger';
import { Observable, of } from 'rxjs';
import { LeaveRegister } from '../models/leave-status';

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

  getCurrYearBal(empCode: string): Observable<LeaveRegister> {
    return this.http.get<LeaveRegister>(baseURL + "api/leave/balance/" + `${empCode}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getPrevYearBal(empCode: string): Observable<LeaveRegister> {
    return this.http.get<LeaveRegister>(baseURL + "api/leave/prev-year/balance/" + `${empCode}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getNextYearBal(empCode: string): Observable<LeaveRegister> {
    return this.http.get<LeaveRegister>(baseURL + "api/leave/next-year/balance/" + `${empCode}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}
