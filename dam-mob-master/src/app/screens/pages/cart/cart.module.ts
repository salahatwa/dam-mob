import { NgModule } from '@angular/core';


import { CartPageRoutingModule } from './cart-routing.module';

import { CartItemModule } from '../../component/cart-item/cart-item.module';
import { SharedModule } from '../../shared/component/shared.module';
import { CartPage } from './cart.page';
import { SearchPage } from '../listing/customers/search/search.page';
import { SearchPageModule } from '../listing/customers/search/search.module';

@NgModule({
  imports: [
    SharedModule,
    CartPageRoutingModule,
    CartItemModule,
    SearchPageModule
  ],
  declarations: [CartPage],
  // entryComponents:[SearchPage]
})
export class CartPageModule { }
