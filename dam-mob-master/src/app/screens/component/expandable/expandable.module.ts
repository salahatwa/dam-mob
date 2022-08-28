import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExpandableComponent } from './expandable.component';



@NgModule({
  declarations: [ExpandableComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [ExpandableComponent]
})
export class ExpandableModule { }
