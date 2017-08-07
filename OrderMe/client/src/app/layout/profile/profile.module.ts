import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        PageHeaderModule
    ],
    declarations: [ProfileComponent]
})
export class ProfileModule { }
