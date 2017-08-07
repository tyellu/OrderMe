import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';
import { ProductService} from '../../services/product.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [ProductService]
})
export class HeaderComponent implements OnInit {

    private user;

    constructor(private translate: TranslateService, public router: Router, private productService: ProductService, private authService: AuthService) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.authService.getLoginObservable().subscribe(
            res => this.user = res
        )

    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.authService.logout()
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onSearchEnter(value) {
        this.router.navigate(['/products', value]);
    }
}
