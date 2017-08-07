import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManufacturerOrdersComponent } from './manufacturer-orders.component';

const routes: Routes = [
    { path: '', component: ManufacturerOrdersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManufacturerOrdersRoutingModule { }
