import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dam-stock-quick-view',
  templateUrl: './collapsible-view.component.html',
  styleUrls: ['./collapsible-view.component.scss'],
})
export class CollapsibleViewComponent implements OnInit {

  @Input() headerFirstText: any;
  @Input() headerSecondText: any;
  @Input() headerThirdText: any;
  @Input() headerFourthText: any;
  @Input() headerFirstValue: any;
  @Input() headerSecondValue: any;
  @Input() headerThirdValue: any;
  @Input() headerFourthValue: any;
  @Input() middelFirstText: any;
  @Input() middelSecondText: any;
  @Input() middleThirdText: any;
  @Input() middelFirstValue: any;
  @Input() middelSecondValue: any;
  @Input() middelThirdValue: any;
  @Input() thirdRowFirstText: any;
  @Input() thirdRowSecondText: any;
  @Input() thirdRowThirdText: any;
  @Input() thirdRowFirstValue: any;
  @Input() thirdRowSecondValue: any;
  @Input() thirdRowThirdValue: any;
  @Input() firstBtnText: any;
  @Input() secondBtnText: any;
  @Input() thirdBtnText: any;
  @Input() fourthBtnText: any;
  @Input() firstBtnIcon: any;
  @Input() secondBtnIcon: any;
  @Input() thirdBtnIcon: any;
  @Input() fourthBtnIcon: any;
  @Input() firstBtnColor: string;
  @Input() secondBtnColor: string;
  @Input() thirdBtnColor: string;
  @Input() fourthBtnColor: string;
  @Input() statusFlag: string;
  @Input() componentName: string;
  
  @Output() firstBtnClick = new EventEmitter();
  @Output() secondBtnClick = new EventEmitter();
  @Output() thirdBtnClick = new EventEmitter();
  @Output() fourthBtnClick = new EventEmitter();
  public btnFlag = false;

  constructor() { }

  ngOnInit() {
    if (this.statusFlag == "Filled" || this.statusFlag == "Cancelled" || this.statusFlag == "Expired" || this.statusFlag == "Pending for cancel "|| this.statusFlag == "Rejected" || this.statusFlag == "تم التنفيذ" || this.statusFlag == "ملغى" || this.statusFlag == "منتهي الصلاحية"|| this.statusFlag == "في انتظار الالغاء" || this.statusFlag == "مرفوض") {
      this.btnFlag = true;
    }
  }

  public firstBtnClicked() {
    this.firstBtnClick.emit();
  }

  public secondBtnClicked() {
    this.secondBtnClick.emit();
  }

  public thirdBtnClicked() {
    this.thirdBtnClick.emit();
  }
  public fourthBtnClicked() {
    this.fourthBtnClick.emit();
  }

  uncommafy(value) {
    if(value || value === 0 || value === '0') {
      return value.toString().replace(/,/g, '');
    }
    else {
      return;
    }
  }
}
