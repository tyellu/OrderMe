import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EditProductsComponent } from './edit-products.component';
import { EditProductsRoutingModule } from './edit-products-routing.module';
import { PageHeaderModule } from './../../shared';
import { TagInputModule } from 'ngx-chips';

@NgModule({
    imports: [
        CommonModule,
        EditProductsRoutingModule,
        PageHeaderModule,
        FormsModule,
        TagInputModule
    ],
    declarations: [EditProductsComponent]
})
export class EditProductsModule { }
