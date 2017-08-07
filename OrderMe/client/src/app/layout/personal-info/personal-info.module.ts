import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalInfoComponent } from './personal-info.component';
import { PersonalInfoRoutingModule } from './personal-info-routing.module';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        PersonalInfoRoutingModule,
        PageHeaderModule,
        FormsModule
    ],
    declarations: [PersonalInfoComponent]
})
export class PersonalInfoModule { }
