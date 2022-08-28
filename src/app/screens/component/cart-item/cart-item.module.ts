import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartItemComponent } from './cart-item.component';



@NgModule({
  declarations: [CartItemComponent],
  imports: [
    CommonModule, IonicModule,FormsModule
  ], exports: [CartItemComponent]
})
export class CartItemModule { }
