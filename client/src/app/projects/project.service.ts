import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProject } from '../../shared/models/project';
import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from "lodash"

const baseUrl = 'http://localhost:8080/api/auth/projects'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(
    private http: HttpClient
  ) {  }

  getAll(): Observable<IProject[]>{
    console.log(this.http.get<IProject[]>(baseUrl, httpOptions))
    return this.http.get<IProject[]>(baseUrl, httpOptions)
  }

  create(data: any): Observable<any>{
    return this.http.post(baseUrl, data, httpOptions);
  }
}
