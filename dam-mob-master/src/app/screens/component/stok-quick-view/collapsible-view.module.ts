import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CollapsibleViewComponent } from './collapsible-view.component';



@NgModule({
  declarations: [CollapsibleViewComponent],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [CollapsibleViewComponent]
})
export class CollapsibleViewtModule { }
