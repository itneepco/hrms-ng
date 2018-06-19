import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user) {
    console.log(user)
    this.http.post("http://localhost:3000/auth/login", user)
      .subscribe(res => {
        console.log(res)
      },
      error => {
        console.log(error)
      })
  }
}
