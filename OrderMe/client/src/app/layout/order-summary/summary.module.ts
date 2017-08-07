import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { SummaryComponent } from './summary.component';
import { SummaryRoutingModule } from './summary-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        SummaryRoutingModule,
        PageHeaderModule,
	   FormsModule,
	   NgbModule.forRoot()
    ],
    declarations: [SummaryComponent]
})
export class SummaryModule { }
