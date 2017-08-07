import { Injectable } from "@angular/core";
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {ReplaySubject, Observable } from 'rxjs/Rx';
import { Subject }    from 'rxjs/Subject';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class AuthService{

    private loginSubject = new ReplaySubject(1);

    public loginObservable = this.loginSubject.asObservable();

    public isLoggedIn;

    public hasError = false;

    public errorCount = 0;

    stateChange: Subject<boolean> = new Subject<boolean>();
    constructor(private http: Http, private router: Router){
        //Checks if the user is logged in, then redirects to dashboard if so
        this.http.get('/api/auth/isLoggedIn', {})
            .map((res:Response) => res.json())
            .catch((error:any) => {
                this.handleError(error);
                return Observable.throw(error || 'Server error')
            })
            .subscribe(
                user => {
                    console.log(user);
                    this.setIsLoggedInTrue();
                    this.loginSubject.next(user)
                }
            )
    }

    change() {
        this.stateChange.next(this.hasError);
    }

    public updateUser(){
    this.http.get('/api/auth/isLoggedIn', {})
            .map((res:Response) => res.json())
            .catch((error:any) => {
                this.handleError(error);
                return Observable.throw(error || 'Server error')
            })
            .subscribe(
                user => {
                    console.log(user);
                    this.setIsLoggedInTrue()
                    this.loginSubject.next(user)
                }
            )

    }
    //This logged in the user and sends the logged in user to all subscribers of the loginObservable
    public login(username, password){
        if (!username || !password) return;
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(username + ":" + password));
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        this.http.post('/api/auth/login', {}, {headers: headers})
            .map((res:Response) => res.json())
            .catch((error:any) => {
                this.handleError(error);
                return Observable.throw(error || 'Server error')
            })
            .subscribe(
                user => {
                    console.log(user);
                    this.setIsLoggedInTrue();
                    this.loginSubject.next(user);
                }
            )
    }

    private handleError(error){
        this.errorCount++;
        this.hasError = this.errorCount > 1;
        this.change();
        //Checks if errors and stuffs, console logs it
        if (error.error == 'Unauthorized' && this.getIsLoggedIn()){
            this.setIsLoggedInFalse();
            this.logout()
        }
        console.error(error);
    }
    //This returns the observable to a logged in user
    public getLoginObservable() : Observable<any>{
        return this.loginObservable;
    }

    public logout(){
        //logs the user out and redirects
            this.setIsLoggedInTrue()
        this.router.navigate(['/login']);
            this.http.get('/api/auth/logout', {})
                .map((res:Response) => res.json())
                .catch((error:any) => {
                    this.handleError(error.json());
                    this.hasError = false;
                    this.change();
                    return Observable.throw(error.json() || 'Server error')
                })
                .subscribe(
                    res => {
                        this.setIsLoggedInFalse();
                        this.hasError = false;
                        this.change();
                        this.loginSubject.next(res);
                        this.router.navigate(['/login']);
                    }
                );
        this.hasError = false;
        this.change();
    }

    public getIsLoggedIn(){
        return localStorage.getItem("isLoggedIn") == 'true';
    }

    public setIsLoggedInFalse(){
        localStorage.setItem('isLoggedIn', 'false');
    }
    public setIsLoggedInTrue(){
        if(!this.getIsLoggedIn()){
            localStorage.setItem('isLoggedIn', 'true');

        }
    }



}
