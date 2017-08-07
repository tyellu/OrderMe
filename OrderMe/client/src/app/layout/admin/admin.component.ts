import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { TagService } from '../../shared/services/tag.service';

@Component({
    selector: 'admin-page',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss'],
    providers: [AdminService, TagService]
})
export class AdminComponent implements OnInit {

    private analytics;
    public alerts: Array<any> = [];
    public tags = [];
    public doughnutChartLabels: string[] = ['Consumers', 'Suppliers', 'Admins'];
    public doughnutChartData: number[] = [1, 1, 1];
    public doughnutChartType: string = 'doughnut';
    public tagName = "";

    public result = {};
    constructor(private adminService: AdminService, private tagService: TagService) { }
    ngOnInit() {
        this.adminService.getAnalytics().subscribe(
            res => {
                this.analytics = res;
                this.doughnutChartData = [res.numConsumer, res.numSupplier, res.numAdmin]
            }
        );

        this.tagService.getTags().subscribe(
            res => {
                this.tags = res;
            }
        );

    }

    private makeAdmin(username){
        this.adminService.makeAdmin(username).subscribe(
            res => {
                if(res.error){
                    return this.alerts.push({id: 2, type: 'danger', message: res.error});
                }
                this.alerts.push({id: 1, type: 'success', message: res.username + ' is now an admin'})
            }
        )
    }

    private banUser(username){
        this.adminService.banUser(username).subscribe(
            res => {
                if(res.error){
                    return this.alerts.push({id: 2, type: 'danger', message: res.error});
                }
                this.alerts.push({id: 1, type: 'success', message: res.username + ' is now banned'})
            }
        )
    }

    private unbanUser(username){
        this.adminService.unbanUser(username).subscribe(
            res => {
                if(res.error){
                    return this.alerts.push({id: 2, type: 'danger', message: res.error});
                }
                this.alerts.push({id: 1, type: 'success', message: res.username + ' is now unbanned'})
            }
        )
    }

    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    public addTag() {
        this.tagService.addTag(this.tagName).subscribe(
            res => {
                this.tags.push(res);
            }
        );

        this.tagName = "";
    }

    public deleteTag(id) {
        this.tagService.deleteTag(id).subscribe(
            res => {
                this.tags.splice(this.tags.findIndex(i => i._id === id), 1);
            }
        );
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
