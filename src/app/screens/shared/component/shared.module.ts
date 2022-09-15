import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TruncatePipe } from '../pipes/turncate.pipe';
import { BadgeComponent } from './badge/badge.component';
import { ButtonComponent } from './button/button.component';
import { CloudSyncComponent } from './cloud-sync/cloud-sync.component';
import { EmptyResultComponent } from './empty-result/empty-result.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { MonthChooseComponent } from './month-choose/month-choose.component';



@NgModule({
  declarations: [
    CloudSyncComponent,
    MonthChooseComponent,
    BadgeComponent,
    ButtonComponent,
    EmptyResultComponent,
    FormErrorComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    CloudSyncComponent,
    MonthChooseComponent,
    BadgeComponent,
    ButtonComponent,
    EmptyResultComponent,
    FormErrorComponent,
    TruncatePipe
  ],
  providers: [DatePipe]
})
export class SharedModule { }
