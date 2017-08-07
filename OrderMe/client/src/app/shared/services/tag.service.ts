 import { Injectable } from "@angular/core";
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {ReplaySubject, Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class TagService{

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

    //sends an API Call to get all tags
    public getTags(){
        return this.apiCall('api/tags/getAlltags', 'get');
    }

    public addTag(name) {
        return this.apiCall('/api/tags/createTag', 'post', {name: name});
    }

    public deleteTag(id) {
        return this.apiCall('/api/tags/removeTag/'.concat(id), 'delete');
    }
    private handleError(error){
        console.error(error);
    }
}
