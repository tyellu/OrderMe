import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { OrderService } from '../../shared/services/order.service';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



declare let paypal: any;

@Component({
    selector: 'app-order',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    providers: [OrderService, ProductService]
})

export class SummaryComponent implements OnInit {

     closeResult: string;
    prod: any = {};
	displayPretax: string = (0).toFixed(2);
	displayTax: string = (0).toFixed(2);
	displayTotal: string = (0).toFixed(2);
	displayPricePer: string;

    public amount = 0;
     public errorStock = false;
    public errorQuantity = false;
    public errorTotal = false;
    public errorOverStock = false;
    public pricePer = 0;
    public pretax = 0;
    public tax = 0;
    public total = 0;
    public prodId;

    public alreadyInit;

    private user;

    constructor(public router: Router, private route: ActivatedRoute, private modalService: NgbModal, private orderService: OrderService, private authService: AuthService, private userService: UserService, private productService: ProductService) {

    this.route.params.subscribe(params => {
            this.prodId = params['id'];

            this.productService.getProductById(this.prodId).subscribe(
                res => {
                    this.prod = res;
                    this.pricePer = res.listingPrice;
			    this.displayPricePer = (this.pricePer).toFixed(2);
                });
            });

 }

open(content) {

       this.errorQuantity = false;
       this.errorTotal = false;
       this.errorOverStock = false;

        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }

        _keyPress2(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar) && (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40)) {
      // invalid character, prevent input
            this.errorStock = true;
      event.preventDefault();
    }
        else {
            this.errorStock = false;
        }
    }

public onSubmitClick(listingStock) {

    if (this.amount > listingStock) {
        this.errorOverStock = true;
    } else {
        this.pretax = this.amount*this.pricePer;
	   this.displayPretax = (this.pretax).toFixed(2);
        this.tax = this.pretax*0.13;
	   this.displayTax = (this.tax).toFixed(2);
        this.total = this.pretax+this.tax;
	   this.displayTotal = (this.total).toFixed(2);

        if(this.amount > 0 && !this.alreadyInit){
            let CREATE_PAYMENT_URL  = '/api/order/createOrder';
            let EXECUTE_PAYMENT_URL = '/api/order/payOrder';

            let orderID;

            var routerCopy = this.router;

            this.alreadyInit = true;
            paypal.Button.render({
                env: 'sandbox', // Or 'sandbox'


                commit: true, // Show a 'Pay Now' button

                payment:() => {
                    return paypal.request.post(CREATE_PAYMENT_URL, {
                        orderAmount: this.amount,
                        orderListingId: this.prod._id
                    }).then(function (data) {
                        return data.id;
                    });
                },

                onAuthorize:(data) => {
                    return paypal.request.post(EXECUTE_PAYMENT_URL, {
                        paymentID: data.paymentID,
                        payerID:   data.payerID
                    }).then(function(data) {
                        console.log(data);
                        console.log(routerCopy);
                        routerCopy.navigate(['/order', data._id])

                    });
                }
            }, '#paypal-button');
        }
    }

}

public onOrderClick(id, bfname, blname, bAptNo, bStreet, bCity, bProv, bCountry, bPC, sfname, slname, sAptNo, sStreet, sCity, sProv, sCountry, sPC) {

    if (!this.amount) {
        // invalid quantity, prevent order creation
        this.errorQuantity = true;
    } else if (!this.total){
        this.errorTotal = true;
    } else {

        this.orderService.registerOrder(this.amount, id, bfname, blname, bAptNo, bStreet, bCity, bProv, bCountry, bPC, sfname, slname, sAptNo, sStreet, sCity, sProv, sCountry, sPC).subscribe(
            res => {
                this.router.navigate(['/order', res._id]);
            });
        }

}

public onUpdateSClick(id, fname, lname, street, aptNo, city, province, country, postalCode) {

    //this.router.navigate(["/order-summary", id]);

    this.userService.updateShippingAddress(this.user._id, fname, lname, aptNo, street, city, province, country, postalCode).subscribe(
            res => {
            this.user = res;
            this.authService.updateUser();

            }
        );


}

public onUpdateBClick(id, fname, lname, street, aptNo, city, province, country, postalCode) {

    //this.router.navigate(["/order-summary", id]);

    this.userService.updateBillingAddress(this.user._id, fname, lname, aptNo, street, city, province, country, postalCode).subscribe(
            res => {
            this.user = res;
            this.authService.updateUser();

            }
        );

}

    ngOnInit() {



        this.authService.getLoginObservable().subscribe(
            res => {
            this.user = res
            } )
    }
}