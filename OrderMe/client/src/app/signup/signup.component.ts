import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    private accountType;
    public passMatch = true;
    public hasEmpties = false;
    constructor(public router: Router, private userService: UserService) { 
        this.passMatch = true;
        this.hasEmpties = false;
    }

    ngOnInit() { }

    onRegister(username, password, password2, accountType){
        if (!username || !password || !password2 || !accountType) {
            this.hasEmpties = true;
            this.passMatch = password == password2;
        }
        else {
            if (password == password2) {
                //userService.register returns an observable that you can subscribe to for updates (in this case there will only be 1 update since it's an http call
                this.userService.register(username, password, accountType).subscribe(
                    //res containes the current logged in user.
                    res => {
                        console.log(res);
                        this.userService.registerSuccess = true;
                        this.router.navigate(['/login'])
                    }
                )
            }
            else {
                this.hasEmpties = false;
                this.passMatch = false;
            }
        }
    }
}
