import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
	        { path: 'product-page/:id', loadChildren: './product-page/product.module#ProductModule' },
            { path: 'edit-product/:id', loadChildren: './edit-product/edit-products.module#EditProductsModule' },
		    { path: 'order-summary/:id', loadChildren: './order-summary/summary.module#SummaryModule' },
        	{ path: 'order/:id', loadChildren: './order/order.module#OrderModule' },
            { path: 'products', loadChildren: './products/products.module#ProductsModule' },
            { path: 'myproducts', loadChildren: './my-products/my-products.module#MyProductsModule' },
            { path: 'myorders', loadChildren: './my-orders/my-orders.module#MyOrdersModule' },
            { path: 'products/:searchVal', loadChildren: './products/products.module#ProductsModule' },
            { path: 'add-products', loadChildren: './add-products/add-products.module#AddProductsModule' },
            { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
            { path: 'editprofile', loadChildren: './editprofile/editprofile.module#EditProfileModule'},
            { path: 'personal-info', loadChildren: './personal-info/personal-info.module#PersonalInfoModule'},
            { path: 'manufacturer-orders', loadChildren: './manufacturer-orders/manufacturer-orders.module#ManufacturerOrdersModule'},
            { path: '', redirectTo: 'products', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
