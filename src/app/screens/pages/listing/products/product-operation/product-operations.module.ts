import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { ProductOperationsRoutingModule } from './product-operations-routing.module';
import { ProductOperationsComponent } from './product-operations.component';



@NgModule({
  declarations: [ProductOperationsComponent],
  imports: [
    SharedModule, ProductOperationsRoutingModule,
  ],
  exports: [ProductOperationsComponent]
})
export class ProductOperationsModule { }
