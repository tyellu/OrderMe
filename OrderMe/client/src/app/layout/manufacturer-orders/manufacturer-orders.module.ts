import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideOrdersDirective } from '../../directives/clickOutsideOrders.directive';

import { ManufacturerOrdersComponent } from './manufacturer-orders.component';
import { ManufacturerOrdersRoutingModule } from './manufacturer-orders-routing.module';
import { PageHeaderModule } from './../../shared';
import {
    AlertComponent,
    ButtonsComponent,
    ModalComponent,
    CollapseComponent,
    DatePickerComponent,
    DropdownComponent,
    PaginationComponent,
    PopOverComponent,
    ProgressbarComponent,
    TabsComponent,
    TooltipComponent,
    TimepickerComponent,
} from './components';

@NgModule({
    imports: [
        CommonModule,
        ManufacturerOrdersRoutingModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    declarations: [ManufacturerOrdersComponent, DropdownComponent, ClickOutsideOrdersDirective]
})
export class ManufacturerOrdersModule { }
