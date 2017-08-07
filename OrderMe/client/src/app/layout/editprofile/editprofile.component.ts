import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-editprofile',
    templateUrl: './editprofile.component.html',
    styleUrls: ['./editprofile.component.scss']
})

export class EditProfileComponent implements OnInit {
	
	private user;
	
    public image = "";
    public fname = "";
    public lname = "";
    public city = "";
    public ctry = "";
    public phn = "";
    public email = "";
    public company = "";
    public cpost = "";


	constructor(public router: Router,private authService: AuthService, private userService: UserService) { }

    ngOnInit() { 
    	 this.authService.getLoginObservable().subscribe(
            res => {
            this.user = res;
            this.image = res.Image;
            this.fname = res.Fname;
            this.lname = res.Lname;
            this.city = res.City;
            this.ctry = res.Country;
            this.phn = res.Phone;
            this.email = res.Email;
            this.company = res.Company;
            this.cpost = res.CPosition;
            }
        );
    }

    update(){
        this.userService.update(this.fname, this.lname, this.city, this.ctry, this.phn, this.email, this.company, this.cpost, this.image).subscribe(
            res => {
            this.user = res;
            this.authService.updateUser();
            this.router.navigate(['/profile']);

            },
            error => {
                window.alert(JSON.stringify(error));
                console.log(error);
            }
        );

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

}
