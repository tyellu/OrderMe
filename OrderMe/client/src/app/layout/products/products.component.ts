import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { TagService } from '../../shared/services/tag.service';
import { AuthService } from '../../shared/services/auth.service';
import { ClickOutsideDirective } from '../../directives/clickOutside.directive';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    providers: [ProductService, TagService]
})

export class ProductsComponent implements OnInit {
	masterProdList = [];
	prodList = [];
	imagePath = "../../../assets/images/logo.png";
	tags = [];
	filterTags = [];
	private sub: any;
	private user;

	public search : string;
	public closeFilter = false;
	constructor(public router: Router, private route: ActivatedRoute, private productService: ProductService, private tagService: TagService, private authService: AuthService) {
		this.authService.getLoginObservable().subscribe(
            res => {
                this.user = res;
				this.productService.getProducts().subscribe(
					res => {
						this.sub = this.route.params.subscribe(
							params => {
								this.search = params['searchVal'];
								this.masterProdList = [];

								if (!this.search) {
									this.masterProdList = res;
								}
								else {
									for (var key in res) {
										if (res[key].listingName.toUpperCase().includes(this.search.toUpperCase())) {
											this.masterProdList.push(res[key]);
										}
									}
								}
								this.prodList = this.masterProdList;
							}
						);

						this.tagService.getTags().subscribe(
							res => {
								this.tags = res;
							}
						);
					}
				);
			}
		);

	}

    ngOnInit() { }

	close() {
		this.closeFilter = true;
	}

	open() {
		this.closeFilter = false;
	}

	filter(event, id) {
		this.prodList = [];
		if (event.target.checked) {
			this.filterTags.push(id);
		}
		else {
			this.filterTags.splice(this.filterTags.indexOf(id));

			if (this.filterTags.length == 0) {
				this.prodList = this.masterProdList;
			}
		}

		for (var i = 0; i < this.masterProdList.length; i++) {
			for (var j = 0; j < this.tags.length; j++) {
				if (this.masterProdList[i].listingTags.includes(this.filterTags[j])){
					this.prodList.push(this.masterProdList[i]);
					j = this.tags.length;
				}
			}
		}
	}

	sortAZ() {
		this.prodList = this.prodList.sort(function (a, b) {
			if (a.listingName > b.listingName) {
				return 1;
			}
			else if (a.listingName < b.listingName) {
				return -1;
			}
			else {
				return 0;
			}
		})
	}


	sortZA() {
		this.prodList = this.prodList.sort(function (a, b) {
			if (a.listingName < b.listingName) {
				return 1;
			}
			else if (a.listingName > b.listingName) {
				return -1;
			}
			else {
				return 0;
			}
		})
	}


	sortHigh() {
		this.prodList = this.prodList.sort(function (a, b) {
			if (a.listingPrice < b.listingPrice) {
				return 1;
			}
			else if (a.listingPrice > b.listingPrice) {
				return -1;
			}
			else {
				return 0;
			}
		})
	}


	sortLow() {
		this.prodList = this.prodList.sort(function (a, b) {
			if (a.listingPrice > b.listingPrice) {
				return 1;
			}
			else if (a.listingPrice < b.listingPrice) {
				return -1;
			}
			else {
				return 0;
			}
		})
	}

	onOrderClick(id) {
        this.router.navigate(["/order-summary", id]);
    }
}
