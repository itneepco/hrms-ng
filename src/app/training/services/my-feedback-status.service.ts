import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyFeedbackStatusService {

  private feebackStatus = new Subject() 

  status$ = this.feebackStatus.asObservable()

  update(val) {
    this.feebackStatus.next(val)
  }
}
