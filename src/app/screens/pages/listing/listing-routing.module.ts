import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListingPage } from './listing.page';

const routes: Routes = [
  {
    path: '',
    component: ListingPage,
    children: [
      {
        path: 'products',
        loadChildren: () => import('./products/product.module').then(m => m.ProductModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./customers/customer.module').then(m => m.CustomerModule)
      },

      {
        path: 'invoices',
        loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule)
      },
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },

    ],
  },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListingPageRoutingModule { }
