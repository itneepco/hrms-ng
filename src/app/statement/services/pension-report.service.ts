import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { ErrorHandlerService } from "../../shared/services/error-handler.service";
import { pfPensionURL } from "./../../shared/config/baseUrl";

@Injectable({
  providedIn: "root",
})
export class PensionReportService {
  url = pfPensionURL + "pensionReport";

  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  getStatement(empCode: string, finYear: string): Observable<any> {
    let url = `${this.url}/${empCode}`;
    url = url + `?finYear=${finYear}`;

    console.log(url);
    return this.http
      .get<any>(url)
      .pipe(catchError((err) => this.handler.handleError(err)));
    url = null;
    // return from(pensionReport)
  }
}
