import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import {tap} from 'rxjs/operators';
import moment from "moment";

const baseUrl = 'http://localhost:8080/api/auth/signin'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  login(username:string, password:string){
    return this.http.post(baseUrl, {username, password}, httpOptions)
    .pipe(
      tap(res => {
        this.setSession(res)}),
        shareReplay())
  }

  private setSession(authResult:any) {
    const expiresAt = moment().add(authResult.exp,'second');
    localStorage.setItem('id_token', authResult.accessToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }          

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
      console.log("User logged out.")
  }

  public isLoggedIn() {
      const today = new Date()
      return moment(today).isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration:any = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
  }    
}