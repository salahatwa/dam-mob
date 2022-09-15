import { Component, Input, OnInit } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

@Component({
  selector: 'dam-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent implements OnInit {

  constructor() { }

  @Input() message: String;
  @Input() control: NgForm | NgControl;


  ngOnInit() { }


}
