import { Injectable } from "@angular/core";
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {ReplaySubject, Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class UserService{

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
    public register(username, password, accountType){

        return this.apiCall('/api/user', 'post', {username: username, password: password, accountType: accountType});

    }

    public update(fname, lname, city, ctry, phn, eml, cmpy, cpost, image) {
        return this.apiCall('/api/user/updateUser', 'put', {Fname: fname, Lname: lname, City: city, Country: ctry, Phone: phn, Email: eml, Company: cmpy, CPosition: cpost, Image: image});
    }

    public updateBillingAddress(userId, fname, lname, aptNum, street, city, province, country, postalcode) {
        return this.apiCall('/api/user/updateBillingInfo/'.concat(userId), 'post', {Fname: fname, Lname: lname, aptNo: aptNum, Street: street, City: city, Province: province, Country: country, PostalCode: postalcode});
    }

    public updateShippingAddress(userId, fname, lname, aptNum, street, city, province, country, postalcode) {
        return this.apiCall('/api/user/updateShippingInfo/'.concat(userId), 'post', {Fname: fname, Lname: lname, aptNo: aptNum, Street: street, City: city, Province: province, Country: country, PostalCode: postalcode});
    }

    public updatePaymentInfo(userId, fullname, cardtype, cardnum, cardmonth, cardyear, securecode) {
        return this.apiCall('/api/user/updatePaymentInfo/'.concat(userId), 'post', {name: fullname, cardNo: cardnum, type: cardtype, expiryYear: cardyear, expiryMonth: cardmonth, code: securecode});
    }
    private handleError(error){
        console.error(error);
    }
}
