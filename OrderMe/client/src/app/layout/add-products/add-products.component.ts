import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { TagService } from '../../shared/services/tag.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-products',
    templateUrl: './add-products.component.html',
    styleUrls: ['./add-products.component.scss'],
    providers: [ProductService, TagService]
})

export class AddProductsComponent implements OnInit {

	public image;
	public name;
	public price;
	public stock;
	public desc;

	public errorPrice = false;
	public errorStock = false;
	public availTags = [];
	public tagQueue: Array<String> = [];


	constructor(public router: Router, private productService: ProductService, private tagService: TagService) {
			this.tagService.getTags().subscribe(
				res => {
					this.availTags = res;
				}
			);
	}
    ngOnInit() { }

    public onSubmitClick() {
    	this.productService.registerProduct(this.name, this.price, this.image, this.stock, this.desc, this.tagQueue).subscribe(
    		res => {
    			this.router.navigate(['/product-page', res._id]);
    		});
    }

    changeListener($event) : void {
	  this.readThis($event.target);
	}

	readThis(inputValue: any): void {
	  var file:File = inputValue.files[0];
	  var myReader:FileReader = new FileReader();

	  myReader.onloadend = (e) => {
	    this.image = myReader.result;
	  }

	  myReader.readAsDataURL(file);	  
	}

	onItemAdded(event) {
		this.tagQueue.push(event.value);
	}

	onItemRemoved(event) {
		this.tagQueue.splice(this.tagQueue.indexOf(event.value), 1);
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
