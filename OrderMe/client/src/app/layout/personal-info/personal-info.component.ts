import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.scss']
})

export class PersonalInfoComponent implements OnInit {
    
    private user;
    public bfname = "";
    public blname = "";
    public baptNum = "";
    public bstreet = "";
    public bcity = "";
    public bprovince = "";
    public bcountry = "";
    public bpostalcode = "";

    public sfname = "";
    public slname = "";
    public saptNum = "";
    public sstreet = "";
    public scity = "";
    public sprovince = "";
    public scountry = "";
    public spostalcode = "";

    public cname = "";
    public ctype = "";
    public cnum = "";
    public cmonth = "";
    public cyear = "";
    public ccode = "";

    constructor(public router: Router,private authService: AuthService, private userService: UserService) { }

    ngOnInit() { 
         this.authService.getLoginObservable().subscribe(
            res => {
                this.user = res;

                this.bfname = res.BillingAddress.Fname;
                this.blname = res.BillingAddress.Lname;
                this.baptNum = res.BillingAddress.aptNo;
                this.bstreet = res.BillingAddress.Street;
                this.bcity = res.BillingAddress.City;
                this.bprovince = res.BillingAddress.Province;
                this.bcountry = res.BillingAddress.Country;
                this.bpostalcode = res.BillingAddress.PostalCode;

                this.sfname = res.ShippingAddress.Fname;
                this.slname = res.ShippingAddress.Lname;
                this.saptNum = res.ShippingAddress.aptNo;
                this.sstreet = res.ShippingAddress.Street;
                this.scity = res.ShippingAddress.City;
                this.sprovince = res.ShippingAddress.Province;
                this.scountry = res.ShippingAddress.Country;
                this.spostalcode = res.ShippingAddress.PostalCode;

                /*
                this.cname = res.PaymentInfo.name;
                this.cnum = res.PaymentInfo.cardNo;
                this.cmonth = res.PaymentInfo.expiryMonth;
                this.cyear = res.PaymentInfo.expiryYear;
                this.ctype = res.PaymentInfo.type;
                this.ccode = res.PaymentInfo.code;
                */
            }
        )
    }

    onMatchChange(event) {
        if (event.target.checked) {
            this.sfname = this.bfname;
            this.slname = this.blname;
            this.saptNum = this.baptNum;
            this.sstreet = this.bstreet;
            this.scity = this.bcity;
            this.sprovince = this.bprovince;
            this.scountry = this.bcountry;
            this.spostalcode = this.bpostalcode;
        }
        else {
            this.sfname = "";
            this.slname = "";
            this.saptNum = "";
            this.sstreet = "";
            this.scity = "";
            this.sprovince = "";
            this.scountry = "";
            this.spostalcode = "";
        }
    }

    updateInfo() {
        this.updateBilling();
        this.updatePayment();
        this.updateShipping();
        this.router.navigate(['/profile']);
    }

    updateBilling(){
        this.userService.updateBillingAddress(this.user._id, this.bfname, this.blname, this.baptNum, this.bstreet, this.bcity, this.bprovince, this.bcountry, this.bpostalcode).subscribe(
            res => {
            this.user = res;
            this.authService.updateUser();
            }
        );

    }

    updateShipping(){
        this.userService.updateShippingAddress(this.user._id, this.sfname, this.slname, this.saptNum, this.sstreet, this.scity, this.sprovince, this.scountry, this.spostalcode).subscribe(
            res => {
            this.user = res;
            this.authService.updateUser();
            }
        );

    }

    updatePayment(){
        this.userService.updatePaymentInfo(this.user._id, this.cname, this.ctype, this.cnum, this.cmonth, this.cyear, this.ccode).subscribe(
            res => {
            this.user = res;
            this.authService.updateUser();
            }
        );

    }

}