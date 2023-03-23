import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { ErrorHandlerService } from "../../shared/services/error-handler.service";
import { PfReport } from "../models/pf-report";
import { pfPensionURL } from "./../../shared/config/baseUrl";

@Injectable({
  providedIn: "root",
})
export class PfReportService {
  url = pfPensionURL + "pfReport";
  //url = "http://localhost:9000/pfReport";
  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  getStatement(empCode: string, finYear: string): Observable<PfReport> {
    let url = `${this.url}/${empCode}`;
    url = url + `?finYear=${finYear}`;

    return this.http
      .get<PfReport>(url)
      .pipe(catchError((err) => this.handler.handleError(err)));
  }
}
