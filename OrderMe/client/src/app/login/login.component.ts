import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { Observable } from 'rxjs'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public hasError = this.authService.hasError;
    public registeredUser = this.userService.registerSuccess;
    constructor(public router: Router,private authService: AuthService, private userService: UserService) {

     }

     private errorMessage;

    ngOnInit() {
        //when the loginObservable is updated, it checks if its valid and sends to dashboard.
        this.authService.getLoginObservable().subscribe(
            user => {

                if(user.error){
                    return this.errorMessage = user.error;
                }
                if(user.username){
                console.log(this.router.url);
                    if(this.router.url == '/login' && this.authService.getIsLoggedIn()){
                        console.log("Navigating to dashboard", user);


                        this.router.navigate(['/products'])

                    }
                }
            }
        )
    }




    //When the user clicks the login button, it commands the service to log in, (would receive a response in the above code)
    onLoggedin(username, password) {
        this.userService.registerSuccess = false;
        this.registeredUser = false;
        this.authService.login(username, password);
    }

}
