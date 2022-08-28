import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomerFilterDialogComponent } from './customer-filter-dialog.component';



@NgModule({
  declarations: [CustomerFilterDialogComponent],
  imports: [
    CommonModule, IonicModule,FormsModule
  ],
  exports: [
    CustomerFilterDialogComponent
  ]
})
export class CustomerFilterDialogModule { }
