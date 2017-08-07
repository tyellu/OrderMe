import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        ProductRoutingModule,
        PageHeaderModule,
	   FormsModule,
	   NgbModule.forRoot()
    ],
    declarations: [ProductComponent]
})
export class ProductModule { }
