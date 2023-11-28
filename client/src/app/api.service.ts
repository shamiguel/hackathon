import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { BASE_URL } from '../shared/urls';
@Injectable({ 
    providedIn: 'root'
}) 
export class ApiService { 
    constructor(private http: HttpClient) { } 
    getMessage() { 
        console.log(BASE_URL)
        return this.http.get(BASE_URL); 
    } 
}