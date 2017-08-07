 import { Injectable } from "@angular/core";
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {ReplaySubject, Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class OrderService{

    //public prods = [];

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

    //sends an API Call to get all products
    //public getProducts(){
    //    return this.apiCall('api/listing/getAllListings', //'get');
//    }

    //sends an API Call to get an order by id
    public getOrderById(id){
        //window.alert('/api/listing/getListingById'.concat(id));
        return this.apiCall('/api/order/getOrderById/'.concat(id), 'get');
    }

    public getOrderForUser(id){
        //window.alert('/api/listing/getListingById'.concat(id));
        return this.apiCall('/api/user/getOrdersByUser/'.concat(id), 'post');
    }

     public getShippedStatus(id){
        //window.alert('/api/listing/getListingById'.concat(id));
        return this.apiCall('/api/user/setOrderShippedById/'.concat(id), 'put');
    }

    //sends an API Call to register a order
    public registerOrder(amount, id, bfname, blname, billAptNum, billStreet, billCity, bProv, billCountry, billPC, sfname, slname, shipAptNum, shipStreet, shipCity, sProv, shipCountry, shipPC){
        return this.apiCall('/api/order/createOrder', 'post', {orderAmount: amount, orderListingId: id, BillingFname: bfname, BillingLname: blname, BillingAptNo: billAptNum, BillingStreet: billStreet, BillingCity: billCity, BillingProvince: bProv, BillingCountry: billCountry, BillingPostalCode: billPC, ShippingFname: sfname, ShippingLname: slname, ShippingAptNo: shipAptNum, ShippingStreet: shipStreet, ShippingCity: shipCity, ShippingProvince: sProv, ShippingCountry: shipCountry, ShippingPostalCode: shipPC});
    }

    
    private handleError(error){
        console.error(error);
    }
}