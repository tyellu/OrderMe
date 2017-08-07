import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PageHeaderModule } from '../../shared';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { StatModule } from '../../shared';
import {
    NgbCarouselModule,
    NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule,
        CommonModule,
        Ng2Charts,
        PageHeaderModule,
        StatModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
    ],
    declarations: [AdminComponent]
})
export class AdminModule { }
