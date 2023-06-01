import { Injectable } from "@angular/core";
import { Observable, delay, of } from "rxjs";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Auth} from '../models/auth/auth'
const httpOptions ={
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }
  
const apiUrl = 'http://localhost:5091/Auth';
@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    constructor(private httpClient:HttpClient) {}

    validateUsername(username : string) : Observable<boolean> {
        console.log(`Trigger API call ${username}`);
        let existedUsers = ['trungvo', 'tieppt', 'chautran'];
        let isValid = existedUsers.every((x) => x !== username);
        return of(isValid).pipe(delay(1000));
    }

    login(data : Auth) {
        return this.httpClient.post(apiUrl, data, httpOptions);
    }
}