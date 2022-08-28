import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';


const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    outlet: 'dashboard',
  
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
export class CustomerRoutingModule { }
