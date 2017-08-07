 import { Injectable } from "@angular/core";
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {ReplaySubject, Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()

export class ProductService{

	public prods = [];

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
    public getProducts(){
        return this.apiCall('api/listing/getAllListings', 'get');
    }

    public getMyProducts(id) {
        return this.apiCall('api/user/getListingsByUser/'.concat(id), 'post');
    }

    //sends an API Call to get a product by id
    public getProductById(id){
        //window.alert('/api/listing/getListingById'.concat(id));
    	return this.apiCall('/api/listing/getListingById/'.concat(id), 'get');
    }

    //sends an API Call to register a product
    public registerProduct(name, price, image, stock, desc, tags){
        console.log("tags");
        return this.apiCall('/api/listing/createListing', 'post', {listingName: name, listingPrice: +price, listingImage: image, listingStock: +stock, listingDescription: desc, tags: tags});
    }

    //sends an API Call to register a product
    public editProduct(id, name, price, image, stock, desc, tags){
        return this.apiCall('/api/listing/editListing/'.concat(id), 'put', {listingName: name, listingPrice: +price, listingImage: image, listingStock: +stock, listingDescription: desc, tags: tags});
    }

    public deleteProduct(id) {
        return this.apiCall('api/listing/remove/'.concat(id), 'delete');
    }

    public writeReview(listingId, reviewText, reviewRating) {
        return this.apiCall('/api/listing/addReview/'.concat(listingId), 'post', {rating: reviewRating, review: reviewText});
    }

    public getAllReviews() {
        return this.apiCall('/api/listing/getAllReviews', 'get');
    }

    public deleteReview(lisitingId, reviewId) {
        return this.apiCall('/api/listing/removeReviewById/'.concat(reviewId).concat('/').concat(lisitingId), 'delete');
    }

    public getReviewByListingId(listingId) {
        return this.apiCall('/api/listing/getAllReviewsByListing/'.concat(listingId), 'post');
    }

    private handleError(error){
        console.error(error);
    }
}
