import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddProductsComponent } from './add-products.component';
import { AddProductsRoutingModule } from './add-products-routing.module';
import { PageHeaderModule } from './../../shared';
import { TagInputModule } from 'ngx-chips';

@NgModule({
    imports: [
        CommonModule,
        AddProductsRoutingModule,
        PageHeaderModule,
        FormsModule,
        TagInputModule
    ],
    declarations: [AddProductsComponent]
})
export class AddProductsModule { }
