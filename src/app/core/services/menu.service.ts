import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuToggleSource = new Subject() 

  menutToggled$ = this.menuToggleSource.asObservable()

  menuToggle(val) {
    this.menuToggleSource.next(val)
  }

}
