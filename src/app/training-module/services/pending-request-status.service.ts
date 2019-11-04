import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PendingRequestStatusService {

  private requestStatus = new Subject();

  status$ = this.requestStatus.asObservable();

  update(val) {
    this.requestStatus.next(val);
  }
}
