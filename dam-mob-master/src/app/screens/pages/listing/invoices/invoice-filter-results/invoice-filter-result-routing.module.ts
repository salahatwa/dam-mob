import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceFilterResultComponent } from './invoice-filter-result.component';


const routes: Routes = [
  {
    path: '',
    component: InvoiceFilterResultComponent,

  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceFilterResultRoutingModule { }
