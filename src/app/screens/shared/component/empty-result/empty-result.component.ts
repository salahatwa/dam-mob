import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dam-empty-result',
  templateUrl: './empty-result.component.html',
  styleUrls: ['./empty-result.component.scss'],
})
export class EmptyResultComponent implements OnInit {

  constructor() { }
  // @HostBinding('class') class = 'parent';
  @Input() message: String;
  @Input() secondMessage: String;
  @Input() image: String;
  @Input() button: boolean;
  @Input() buttonValue: String;
  @Output() buttonClicked = new EventEmitter<any>();//+ Event emitter

  click() {
    this.buttonClicked.emit();
  }

  ngOnInit() { }


}
