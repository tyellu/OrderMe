import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
	
	private user;
	
	constructor(public router: Router,private authService: AuthService, private userService: UserService) { }

    ngOnInit() { 
    	 this.authService.getLoginObservable().subscribe(
            res => {
            this.user = res
            }
        )
    }
}
