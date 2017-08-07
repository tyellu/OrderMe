import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    providers: [OrderService]
})

export class OrderComponent implements OnInit {

	order = {};

	public id;

	constructor(private orderService: OrderService, private route: ActivatedRoute) { 

		this.route.params.subscribe(params => {
            this.id = params['id'];
	this.orderService.getOrderById(this.id).subscribe(
           res => {
               this.order = res;
		});
		});


	}
	ngOnInit() { }
}
