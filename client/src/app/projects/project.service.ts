import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProject } from '../../shared/models/project';
import { Observable, BehaviorSubject, map } from 'rxjs';
import * as _ from "lodash"
import { PROJECT_URL } from '../../shared/urls';

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
    console.log(this.http.get<IProject[]>(PROJECT_URL, httpOptions))
    return this.http.get(PROJECT_URL, httpOptions).pipe(map((data:any) => {
      return data.projects
    }))
  }

  create(data: any): Observable<any>{
    return this.http.post(PROJECT_URL, data, httpOptions);
  }

  update(data: any): Observable<any>{
    console.log(data.value)
    return this.http.put(PROJECT_URL + `/${data.value.id}`, data.value, httpOptions);
  }

  destroy(id:any): Observable<any>{
    return this.http.delete(PROJECT_URL + `/${id}`, httpOptions)
  }
}
