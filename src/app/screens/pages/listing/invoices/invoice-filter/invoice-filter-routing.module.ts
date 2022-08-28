import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceFilterComponent } from './invoice-filter.component';


const routes: Routes = [
  {
    path: '',
    component: InvoiceFilterComponent,

  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceFilterRoutingModule { }
