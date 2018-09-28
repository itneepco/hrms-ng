import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PendingRequestService {
  private _pending: Subject<string>

  constructor() {
    this._pending = new Subject<string>();
  }

  changeState() {
    this._pending.next("next")
  }

  get pendingState(): Observable<string> {
    return this._pending.asObservable()
  }
}
