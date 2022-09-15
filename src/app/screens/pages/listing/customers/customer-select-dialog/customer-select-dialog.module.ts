import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { CustomerSelectDialogComponent } from './customer-select-dialog.page';


@NgModule({
  declarations: [CustomerSelectDialogComponent],
  imports: [
    SharedModule
  ],
  exports: [
    CustomerSelectDialogComponent,
  ]
})
export class CustomerSelectDialogsModule { }
