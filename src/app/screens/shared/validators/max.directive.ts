import { Directive, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';


@Directive({
    selector: '[maxValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: MaxValidatorDirective, multi: true }
    ]
})
export class MaxValidatorDirective implements Validator {

    @Input(("maxValidator")) max: number;

    validate(c: FormControl) {

        let v: number = +c.value;


        if (isNaN(v)) {
            return { 'max': true, 'maxValue': this.max }
        }

        if (v > this.max) {
            return { 'max': true, 'maxValue': this.max }
        }


        return null;
    }
}