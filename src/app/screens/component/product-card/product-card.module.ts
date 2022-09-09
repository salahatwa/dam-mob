import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared/component/shared.module';



@NgModule({
  declarations: [ProductCardComponent],
  imports: [
    SharedModule
  ], exports: [ProductCardComponent]
})
export class ProductCardModule { }
