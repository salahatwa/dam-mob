import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IInvoice, InvoiceStatus, InvoiceStatusUpdate } from '@core/models/invoice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inv-status-paid-partially',
  templateUrl: './inv-status-paid-partially.component.html',
  styleUrls: ['./inv-status-paid-partially.component.scss'],
  providers: [DatePipe],

})
export class InvStatusPaidPartiallyComponent implements AfterViewInit, OnDestroy {

  formChangesSubscription: Subscription;

  statusRq: InvoiceStatusUpdate = {};

  @Output() request = new EventEmitter();
  @Output() form = new EventEmitter();
  @ViewChild('form') statusForm: NgForm;

  _invoice: IInvoice;

  @Input() set invoice(invoice: IInvoice) {
    this._invoice = invoice;
    this.statusRq.id = this._invoice.id;
    this.statusRq.status = InvoiceStatus.PAID_PARTIALLY;
    this.statusRq.paidDate = this.datepipe.transform(new Date(), 'YYYY-MM-dd');
    // this.statusRq.paidAmt = invoice.paidAmt;
  }


  constructor(public datepipe: DatePipe) {
  }

  ngAfterViewInit() {
    // this.onChangePaidDt(this.statusRq?.paidDate);

    this.formChangesSubscription = this.statusForm.form.valueChanges.subscribe(x => {
      console.log(x);

      this.request.emit(this.statusRq);
      this.form.emit(this.statusForm);
    });
  }

  ngOnDestroy() {
    if (this.formChangesSubscription)
      this.formChangesSubscription.unsubscribe();
  }



  onChangePaidDt(value) {
    console.log(value);
    this.statusRq.paidDate = value;
  }

  onSelectChange(event) {
    this.onChangePaidDt(event?.detail?.value);
  }

}
