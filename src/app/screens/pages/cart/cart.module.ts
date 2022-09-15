import { NgModule } from '@angular/core';


import { CartPageRoutingModule } from './cart-routing.module';

import { SharedModule } from '../../shared/component/shared.module';
import { ValidatorsModule } from '../../shared/validators/validators.module';
import { CustomerSelectDialogsModule } from '../listing/customers/customer-select-dialog/customer-select-dialog.module';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartPage } from './cart.page';


@NgModule({
  imports: [
    SharedModule,
    CartPageRoutingModule,
    ValidatorsModule,
    CustomerSelectDialogsModule
  ],
  declarations: [CartPage, CartItemComponent],
  exports: [SharedModule, ValidatorsModule],
})
export class CartPageModule { }
