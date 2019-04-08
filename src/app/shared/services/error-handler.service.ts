import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

import { JWT_TOKEN_NAME } from '../models/global-codes';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private router: Router) {}

  handleError(error: HttpErrorResponse) {
    console.log(error)

    if(error.status == 409) { //conflict
      return throwError(error) 
    }

    if(error.status == 422) { //Unprocessable Entity
      return throwError(error)
    }

    if(error.status == 401) { //Unauthorized
      localStorage.removeItem(JWT_TOKEN_NAME)
      this.router.navigate(['/login'])
      return throwError(error)
    }
    
    return throwError("An internal error occured!!! Please try again later!")
  }
}
