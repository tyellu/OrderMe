import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    constructor() {
        this.sliders.push({
            imagePath: 'assets/images/slider1.jpg',
            label: 'OrderMe',
            text: 'This application will provide a platform to help businesses establish connections with manufacturer for operational supplies. '
        }, {
            imagePath: 'assets/images/slider2.jpg',
            label: 'drop-ship',
            text: 'Move (goods) from the manufacturer directly to the retailer without going through the usual distribution channels.'
        }, {
            imagePath: 'assets/images/slider3.jpg',
            label: 'We made it easier for you!',
            text: 'Get what you want without worrying about that "middle man"'
        });
    }
    ngOnInit() {}

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
