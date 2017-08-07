import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { OrderService } from '../../shared/services/order.service';
import { ProductService } from '../../shared/services/product.service';


@Component({
    selector: 'my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.scss'],
    providers: [OrderService, ProductService]
})
export class MyOrdersComponent implements OnInit {
    public closeFilter = false;
    private user;

    public orders = [];
    public ordersMaster = [];
    public prodIds = [];
    public prods = {};
    public filters= [];

    constructor(public router: Router, private authService: AuthService, private orderService: OrderService, private productService: ProductService) { 
        this.authService.getLoginObservable().subscribe(
            res => {
                this.user = res;
                this.orderService.getOrderForUser(this.user._id).subscribe(
                    res1 => {
                        this.ordersMaster = res1;
                        this.orders = res1;

                        for (var key in res1) {
                            if (!this.prodIds.includes(res1[key].orderListingId)) {
                                this.prodIds.push(res1[key].orderListingId);
                            }
                        }

                        this.productService.getProducts().subscribe(
                            res2 => {
                                for (var key in res2) {
                                    if (this.prodIds.includes(res2[key]._id)) {
                                        this.prods[res2[key]._id] = res2[key].listingImage;
                                    }
                                }
                            }
                        );

                        this.sortNewest();
                       
                    }
                )

            }
        )		
    }

    ngOnInit() { }

    	close() {
		this.closeFilter = true;
	}

	open() {
		this.closeFilter = false;
	}

	filter(event, id) {
		this.orders = [];
		if (event.target.checked) {
			if (!this.filters.includes(id)) {
                this.filters.push(id);
            }
		}
		else {

			this.filters.splice(this.filters.indexOf(id));

			if (this.filters.length == 0) {
				this.orders = this.ordersMaster;
			}
		}

		for (var i = 0; i < this.ordersMaster.length; i++) {
            var isAdded = false;

            if (this.filters.includes('Paid')) {
                if (this.ordersMaster[i].orderPaid) {
                    this.orders.push(this.ordersMaster[i]);
                    isAdded = true;
                }
            }

            if (!isAdded) {
                if (this.filters.includes('Shipped')) {
                    if (this.ordersMaster[i].orderShipped) {
                        this.orders.push(this.ordersMaster[i]);
                        isAdded = true;
                    }
                }
            }
		}
	}

	sortNewest() {
		this.orders = this.orders.sort(function (a, b) {
			if (new Date(a.orderDate) < new Date(b.orderDate)) {
				return 1;
			}
			else if (new Date(a.orderDate) > new Date(b.orderDate)) {
				return -1;
			}
			else {
				return 0;
			}
		})
	}

	
	sortOldest() {
		this.orders = this.orders.sort(function (a, b) {
			if (new Date(a.orderDate) > new Date(b.orderDate)) {
				return 1;
			}
			else if (new Date(a.orderDate) < new Date(b.orderDate)) {
				return -1;
			}
			else {
				return 0;
			}
		})
	}

    getLocalTime(datestring) {
        return new Date(datestring).toDateString();
    }
}
