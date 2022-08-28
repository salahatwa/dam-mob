import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dam-collapsible-list',
  templateUrl: './collapsible-list.component.html',
  styleUrls: ['./collapsible-list.component.scss'],
})
export class CollapsibleListComponent implements OnInit {

  // public item = { expanded: false };
  public changeBoxContainer: any;
  @Input() cardTextOne: any;
  @Input() cardTextTwo: any;
  @Input() cardTextThree: any;
  @Input() cardTextFour: any;
  @Input() cardTextFive: any;
  @Input() cardTextSeven: any;
  @Input() headerList = [];
  @Input() cardTextOneSecondLine: any;
  @Input() cardTextOneThirdLine: any;
  @Input() cardTextOneFourthLine: any;
  @Input() arrow = true;
  @Input() statusColor: any;
  @Input() formName: any;
  @Input() colOneSize: any;
  @Input() colTwoSize: any;
  @Input() colThreeSize: any;
  @Input() colFourSize: any;
  @Input() colFiveSize: any;
  @Input() colSixSize: any;
  @Input() colSevenSize: any;

  @Input() expand: boolean;
  @Input() rowClass: string;
  @Output() collabseClick = new EventEmitter();
  public boxColor = '';


  constructor() { }

  ngOnInit() {

    // setTimeout(() => {
    //   fitty('#code-container .code-container', {
    //     minSize: 10,
    //     maxSize: 8,
    //     multiLine: false
    //   });
    //  }, 1000);

    if (this.formName == "mutualFund") {
      this.cardTextFive = parseFloat(this.cardTextFive);
    }

    if (this.formName === "outstanding") {
      if (this.cardTextFive === "Rejected" || this.cardTextFive === "مرفوض") {
        this.boxColor = "changeValueContainerRed"
      }
      else if (this.cardTextFive === "Filled" || this.cardTextFive === "تم التنفيذ") {
        this.boxColor = "changeValueContainerGreen"
      }
      else if (this.cardTextFive === "Queued" || this.cardTextFive === "قائم") {
        this.boxColor = "changeValueContainerSkyBlue"
      }
      else if (this.cardTextFive === "Partially filled" || this.cardTextFive === "منفذ جزئيا") {
        this.boxColor = "changeValueContainerOrange"
      }
      else if (this.cardTextFive === "Replaced" || this.cardTextFive === "معدل") {
        this.boxColor = "changeValueContainerPurple"
      } else {
        this.boxColor = "changeValueContainerGrey"
      }
    } else if (this.formName === "MFOutstanding") {
      this.boxColor = "changeValueContainerGreen"
    }
  }

  expandItem() {
    this.collabseClick.emit();
    // if (this.expand) {

    //   this.expand = false;

    // } else {
    //   this.expand = true;
    //   // this.items.map(listItem => {

    //   //   if (item == listItem) {

    //   //     listItem.expanded = !listItem.expanded;

    //   //   } else {

    //   //     listItem.expanded = false;

    //   //   }

    //   //   return listItem;

    //   // });

    // }

  }

  uncommafy(value) {
    if (value || value === 0 || value === '0') {
      return value.toString().replace(/,/g, '');
    }
    else {
      return;
    }
  }


}
