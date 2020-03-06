import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AttendPendingReqService {
  private _pendingCount: Subject<string>;
  private _approvalCount: Subject<string>;

  constructor() {
    this._pendingCount = new Subject<string>();
    this._approvalCount = new Subject<string>();
  }

  updatePendingCount() {
    this._pendingCount.next("next");
  }

  updateApprovalCount() {
    this._approvalCount.next("next");
  }

  get pendingReqState(): Observable<string> {
    return this._pendingCount.asObservable();
  }

  get approvalReqState(): Observable<string> {
    return this._approvalCount.asObservable();
  }
}
