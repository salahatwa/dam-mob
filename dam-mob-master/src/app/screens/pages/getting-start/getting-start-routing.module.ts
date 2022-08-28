import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GettingStartPage } from './getting-start.page';

const routes: Routes = [
  {
    path: '',
    component: GettingStartPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GettingStartPageRoutingModule {}
