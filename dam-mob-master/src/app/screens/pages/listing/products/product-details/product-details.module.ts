import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { ProductDetailsComponent } from './product-details.component';


@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [SharedModule, ProductDetailsRoutingModule],
  exports: [ProductDetailsComponent, ProductDetailsRoutingModule],
})
export class ProductDetailsModule { }
