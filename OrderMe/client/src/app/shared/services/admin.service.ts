import { Injectable } from "@angular/core";
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {ReplaySubject, Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class AdminService{

    private loginSubject = new ReplaySubject(1);

    public loginObservable = this.loginSubject.asObservable();

    public registerSuccess = false;

    constructor(private http: Http){


    }
    //This is a general API call to simplify things, please copy pasta this.
    private apiCall(endpoint, method, payload = null){

        return this.http[method](endpoint, payload)
        // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => {
                this.handleError(error.json());
                return Observable.throw(error.json() || 'Server error')
            });
    };
    //sends an API Call to reguster the user

    public getAnalytics(){
        return this.apiCall('/api/admin/analytics', 'get');
    }

    public makeAdmin(username){
        return this.apiCall('/api/admin/makeAdmin', 'post', {username: username});
    }

    private handleError(error){
        console.error(error);
    }

    public banUser(username){
        return this.apiCall('/api/admin/banUser', 'post', {username: username});
    }
    public unbanUser(username){
        return this.apiCall('/api/admin/unbanUser', 'post', {username: username});
    }
}
