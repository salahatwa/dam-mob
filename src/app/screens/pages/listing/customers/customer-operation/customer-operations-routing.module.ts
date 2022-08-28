import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerOperationsComponent } from './customer-operations.component';


const routes: Routes = [
  {
    path: ':id',
    component: CustomerOperationsComponent,
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
export class CustomerOperationsRoutingModule { }
