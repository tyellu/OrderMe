import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfileComponent } from './editprofile.component';
import { EditProfileRoutingModule } from './editprofile-routing.module';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        EditProfileRoutingModule,
        PageHeaderModule,
        FormsModule
    ],
    declarations: [EditProfileComponent]
})
export class EditProfileModule { }
