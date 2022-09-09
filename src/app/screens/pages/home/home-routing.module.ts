import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'listing',
        loadChildren: () => import('./../../pages/listing/listing.module').then(m => m.ListingPageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./../../pages/cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./../../pages/account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'overview',
        loadChildren: () => import('./../../pages/overview/overview.module').then(m => m.OverviewModule)
      },
      {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
