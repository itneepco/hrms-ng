import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse) {
    console.log(error)
    if(error.status == 401){
      return throwError("Unauthorized Access. Either you dont have sufficient previledge or your token has expired")
    }
    if(error.status == 422) {
      return throwError(error)
    }
    return throwError("An internal error occured!!! Please try again later!")
  }
}
