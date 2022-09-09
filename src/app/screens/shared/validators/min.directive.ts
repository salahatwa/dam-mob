import { Directive, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';


@Directive({
    selector: '[minValidator]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: MinValidatorDirective, multi: true }
    ]
})
export class MinValidatorDirective implements Validator {

    @Input(("minValidator")) min: number;

    validate(c: FormControl) {

        let v: number = +c.value;


        if (isNaN(v)) {
            return { 'min': true, 'minValue': this.min }
        }

        if (v < this.min) {
            return { 'min': true, 'minValue': this.min }
        }


        return null;
    }
}