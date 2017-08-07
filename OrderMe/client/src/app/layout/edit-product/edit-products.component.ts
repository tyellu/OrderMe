import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { TagService } from '../../shared/services/tag.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-products',
    templateUrl: './edit-products.component.html',
    styleUrls: ['./edit-products.component.scss'],
    providers: [ProductService, TagService]
})

export class EditProductsComponent implements OnInit {

	public image;

	public name;
	public price;
	public stock;
	public desc;
	public id;
	public errorPrice = false;
	public errorStock = false;
	public availTags = [];
	public tagQueue: Array<String> = [];
	public currTags = [];

		constructor(public router: Router, private route: ActivatedRoute, private productService: ProductService, private tagService: TagService) {

			this.route.params.subscribe(params => {
									this.id = params['id'];
					this.productService.getProductById(this.id).subscribe(
									res => {
											if (res) {
												this.id = res._id;
												this.name = res.listingName;
												this.price = res.listingPrice;
												this.stock = res.listingStock;
												this.desc = res.listingDescription;
												this.image = res.listingImage;
												this.tagQueue = res.listingTags;
											}

											this.tagService.getTags().subscribe(
												res1 => {
													this.availTags = res1;
													for (var i = 0; i < res1.length; i++) {
														if (this.tagQueue.includes(res1[i]._id)) {
															this.currTags.push({value: res1[i]._id, display: res1[i].name});
														}
													}
												}
											);
									});
		});
	}
    ngOnInit() { }

    public onSubmitClick() {
    	this.productService.editProduct(this.id, this.name, this.price, this.image, this.stock, this.desc, this.tagQueue).subscribe(
    		res => {
    			this.router.navigate(['/product-page', res._id]);
    		});
    }

  changeListener($event) : void {
	  this.readThis($event.target);
	}

	onItemAdded(event) {
		this.tagQueue.push(event.value);
	}

	onItemRemoved(event) {
		this.tagQueue.splice(this.tagQueue.indexOf(event.value), 1);
	}

	readThis(inputValue: any): void {
	  var file:File = inputValue.files[0];
	  var myReader:FileReader = new FileReader();

	  myReader.onloadend = (e) => {
	    this.image = myReader.result;
	  }

	  myReader.readAsDataURL(file);	  
	}

	_keyPress1(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar) && (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40)) {
      // invalid character, prevent input
			this.errorPrice = true;
      event.preventDefault();
    }
		else {
			this.errorPrice = false;
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
}
