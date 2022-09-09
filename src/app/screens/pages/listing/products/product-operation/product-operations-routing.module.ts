import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductOperationsComponent } from './product-operations.component';


const routes: Routes = [
  {
    path: ':id',
    component: ProductOperationsComponent,
  },


  // {
  //   path: ':id',
  //   component: CustomerDetailsComponent
  // }
  // , { path: '', redirectTo: 'list', pathMatch: 'full' },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductOperationsRoutingModule { }
