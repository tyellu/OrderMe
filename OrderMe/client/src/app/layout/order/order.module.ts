import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        OrderRoutingModule,
        PageHeaderModule
    ],
    declarations: [OrderComponent]
})
export class OrderModule { }
