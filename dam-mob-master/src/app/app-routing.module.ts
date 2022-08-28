import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './screens/shared/services/auth/auth-guard.service';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },

  // {
  //   path: 'dashboard',
  //   canActivate: [AuthComponentGuard],
  //   canLoad: [AuthGuard],
  //   canDeactivate: [LogoutGuard],
  //   loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  // },
  // 
  {
    path: 'getting-start',
    loadChildren: () => import('./screens/pages/getting-start/getting-start.module').then(m => m.GettingStartPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./screens/pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'listing',
    canActivate: [AuthGuard],
    // canLoad: [AuthGuard],
    // canDeactivate: [LogoutGuard],
    loadChildren: () => import('./screens/pages/listing/listing.module').then(m => m.ListingPageModule),
  },
  {
    path: 'customer-details',
    loadChildren: () =>
      import(`./screens/pages/listing/customers/customer-details/customer-details.module`).then((m) => m.CustomerDetailsModule),
  },
  {
    path: 'product-details',
    loadChildren: () =>
      import(`./screens/pages/listing/products/product-details/product-details.module`).then((m) => m.ProductDetailsModule),
  },

  {
    path: 'invoice-details',
    loadChildren: () =>
      import(`./screens/pages/listing/invoices/invoice-details/invoice-details.module`).then((m) => m.InvoiceDetailsModule),
  },
  {
    path: 'invoice-filter',
    loadChildren: () =>
      import(`./screens/pages/listing/invoices/invoice-filter/invoice-filter.module`).then((m) => m.InvoiceFilterModule),
  },

  {
    path: 'invoice-filter-result',
    loadChildren: () =>
      import(`./screens/pages/listing/invoices/invoice-filter-results/invoice-filter-result.module`).then((m) => m.InvoiceFilterResultModule),
  },


  // 

  // 
  {
    path: 'customer-opt',
    loadChildren: () =>
      import(`./screens/pages/listing/customers/customer-operation/customer-operations.module`).then((m) => m.CustomerOperationsModule),
  },



  // {
  //   path: 'detail/:id',
  //   loadChildren: () => import('./screens/pages/detail/detail.module').then(m => m.DetailPageModule)
  // },
  // {
  //   path: 'cart',
  //   loadChildren: () => import('./screens/pages/cart/cart.module').then(m => m.CartPageModule)
  // },
  // {
  //   path: 'profile',
  //   loadChildren: () => import('./screens/pages/account/account.module').then(m => m.AccountPageModule)
  // },
  {
    path: 'home',
    loadChildren: () => import('./screens/pages/home/home.module').then(m => m.HomePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
