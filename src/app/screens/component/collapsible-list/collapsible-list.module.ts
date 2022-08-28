import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExpandableModule } from '../expandable/expandable.module';
import { CollapsibleListComponent } from './collapsible-list.component';



@NgModule({
  declarations: [CollapsibleListComponent],
  imports: [
    CommonModule, IonicModule,ExpandableModule
  ],
  exports: [CollapsibleListComponent]
})
export class CollapsibleListModule { }
