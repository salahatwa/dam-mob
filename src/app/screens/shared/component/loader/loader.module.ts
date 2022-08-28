import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoaderComponent } from './loader.component';



@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule
  ], exports: [LoaderComponent]
})
export class LoaderModule { }
