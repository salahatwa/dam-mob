import { NgModule } from '@angular/core';
import { MaxValidatorDirective } from './max.directive';
import { MinValidatorDirective } from './min.directive';



@NgModule({
  declarations: [
    MinValidatorDirective,
    MaxValidatorDirective
  ],
  imports: [

  ],
  exports: [
    MinValidatorDirective,
    MaxValidatorDirective
  ],
})
export class ValidatorsModule { }
