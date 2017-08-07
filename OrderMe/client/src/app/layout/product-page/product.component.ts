import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { OrderService } from '../../shared/services/order.service';
import { AuthService } from '../../shared/services/auth.service';
import { TagService } from '../../shared/services/tag.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [ProductService, OrderService, TagService]
})

export class ProductComponent implements OnInit {
        closeResult: string;
	   amount: string;

    prod = {};
    imagePath = "../../../assets/images/logo.png";
    public user;
    public showEdit = false;
    public errorStock = false;
    public isAdmin = false;
    public prodId;

    public reviewText;
    public reviewRating;
    public reviews = [];

    constructor(public router: Router, private route: ActivatedRoute, private productService: ProductService, private authService: AuthService, private modalService: NgbModal, private orderService: OrderService, private tagService: TagService) {

        this.route.params.subscribe(params => {
            this.prodId = params['id'];

            this.productService.getProductById(this.prodId).subscribe(
                res => {
                    this.prod = res;
			    this.amount = (res.listingPrice).toFixed(2);
                    this.showEdit = res.listingUser == this.user._id || this.user.accountType == "admin";
                    this.isAdmin = this.user.accountType == "admin";
                    this.prodId = res._id;

                    // this will change to get by listingid
                    this.productService.getReviewByListingId(this.prodId).subscribe(
                        res => {
                            this.reviews = res;
                        }
                    )
                },
                error => {
                    this.router.navigate(["/not-found"]);
                });
        });
    }
    
    ngOnInit() { 
        this.authService.getLoginObservable().subscribe(
            res => this.user = res
        )
    }

    onEditClick(id) {
        this.router.navigate(["/edit-product", id]);
    }

    onDeleteClick(id) {
        this.productService.deleteProduct(id).subscribe(
            res => {
                if (!res) {
                    this.router.navigate(["/not-found"]);
                }
            }
        )
        this.router.navigate(["/products"]);
    }

    onOrderClick(id) {
        this.router.navigate(["/order-summary", id]);
    }


    open(content) {
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

    onReviewSubmit() {
        this.productService.writeReview(this.prodId, this.reviewText, this.reviewRating).subscribe(
            res => {
                this.reviews.push(res);
            }
        );
        this.reviewText = "";
        this.reviewRating = null;
    }

    onReviewDelete(reviewId) {
        this.productService.deleteReview(this.prodId, reviewId).subscribe(
            res => {
                if (res) {
                    this.reviews.splice(this.reviews.findIndex(i => i._id === reviewId), 1);
                }
            }
        )
    }

    counter(num) {
        return new Array(+num).fill(0);
    }

    reverseCounter(num) {
        return new Array(5 - num).fill(0);
    }


}