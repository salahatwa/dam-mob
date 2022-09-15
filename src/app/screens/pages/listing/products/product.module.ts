import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCardModule } from 'src/app/screens/component/product-card/product-card.module';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { ProductComponent } from './product.component';


const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    outlet: 'dashboard'
  }
]


@NgModule({
  declarations: [ProductComponent],
  imports: [
    SharedModule, ProductCardModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProductComponent
  ]
})
export class ProductModule { }
