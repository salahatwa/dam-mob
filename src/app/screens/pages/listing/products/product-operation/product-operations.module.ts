import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { ProductOperationsRoutingModule } from './product-operations-routing.module';
import { ProductOperationsComponent } from './product-operations.component';
import { ProductOperationsTranslationModule } from './product-operations.translation.module';



@NgModule({
  declarations: [ProductOperationsComponent],
  imports: [
    SharedModule, ProductOperationsRoutingModule, ProductOperationsTranslationModule
  ],
  exports: [ProductOperationsComponent]
})
export class ProductOperationsModule { }
