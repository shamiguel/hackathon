import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProject } from '../../shared/models/project';
import { Observable, BehaviorSubject, map } from 'rxjs';
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

  getAll(): any{
    console.log(this.http.get<IProject[]>(baseUrl, httpOptions))
    return this.http.get(baseUrl, httpOptions).pipe(map((data:any) => {
      return data.projects
    }))/* .subscribe(result => {
      for(const project of result){
        console.log(project)
      }
    }) */
  }

  create(data: any): Observable<any>{
    return this.http.post(baseUrl, data, httpOptions);
  }
}
