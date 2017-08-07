import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideMyDirective } from '../../directives/clickOutsideMy.directive';

import { MyProductsComponent } from './my-products.component';
import { MyProductsRoutingModule } from './my-products-routing.module';
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
        MyProductsRoutingModule,
        PageHeaderModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    declarations: [MyProductsComponent, DropdownComponent, ClickOutsideMyDirective]
})
export class MyProductsModule { }