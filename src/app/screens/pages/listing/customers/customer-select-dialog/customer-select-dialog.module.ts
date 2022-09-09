import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/screens/shared/component/shared.module';
import { CustomerSelectDialogComponent } from './customer-select-dialog.page';
import { CustomerSelectTranslationModule } from './customer-select.translation.module';


@NgModule({
  declarations: [CustomerSelectDialogComponent],
  imports: [
    SharedModule,
    CustomerSelectTranslationModule
  ],
  exports: [
    CustomerSelectDialogComponent,
  ]
})
export class CustomerSelectDialogsModule { }
