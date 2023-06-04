import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User } from '../models/auth.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalComponent } from "../../global-component";
import { ValidationErrors } from '@angular/forms';

const AUTH_API = GlobalComponent.AUTH_API;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {

    user!: User;
    currentUserValue: any;
    private currentUserSubject: BehaviorSubject<User>;

    constructor(private http: HttpClient) { 
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(username: string, password: string, rePassword: string) {
        // return getFirebaseBackend()!.registerUser(email, password).then((response: any) => {
        //     const user = response;
        //     return user;
        // });

        // Register Api
        return this.http.post(AUTH_API + 'signup', {
            username,
            password,
            rePassword,
          }, httpOptions);
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(username: string, password: string,code2:string) {
        // return getFirebaseBackend()!.loginUser(email, password).then((response: any) => {
        //     const user = response;
        //     return user;
        // });
        return this.http.post(AUTH_API + 'signin', {
            username,
            password,
            code2
          }, httpOptions);
    }
    /**
     * 
     * @param username kiểm tra xem đã có user trong hệ thống hay chưa
     * @returns 
     */
    getByUsername(username: string) : Observable<ValidationErrors | null> {
        return this.http.get(AUTH_API + `getByUsername?username=${username}`).pipe(
            map((isValid: object)=>{
                return isValid ? null : {usernameDuplicated: true};
            }),
        )
    }

    /**
     * Returns the current user
     */
    public currentUser(): any {
        return getFirebaseBackend()!.getAuthenticatedUser();
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        // return getFirebaseBackend()!.logout();
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null!);
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend()!.forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    // gen mã code
    genQrCode(id:any): Observable<any> {
        var headerToken = {'Authorization': `Bearer `+ localStorage.getItem('token')};    
        return this.http.get(AUTH_API + `register_code?id=${id}`, {  headers: headerToken, responseType: 'text' });
     }

}

