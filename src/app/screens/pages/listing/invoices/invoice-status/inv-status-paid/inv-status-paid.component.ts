import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IInvoice, InvoiceStatus, InvoiceStatusUpdate } from '@core/models/invoice';

@Component({
  selector: 'app-inv-status-paid',
  templateUrl: './inv-status-paid.component.html',
  styleUrls: ['./inv-status-paid.component.scss'],
  providers: [DatePipe]
})
export class InvStatusPaidComponent implements AfterViewInit {


  statusRq: InvoiceStatusUpdate = {};

  @Output() request = new EventEmitter();
  @Output() form = new EventEmitter();
  @ViewChild('form') statusForm: NgForm;

  _invoice: IInvoice;

  @Input() set invoice(invoice: IInvoice) {
    this._invoice = invoice;
    this.statusRq.id = this._invoice.id;
    this.statusRq.status = InvoiceStatus.PAID;
    this.statusRq.paidDate = this.datepipe.transform(new Date(), 'YYYY-MM-dd');
  }


  constructor(public datepipe: DatePipe) {
  }

  ngAfterViewInit() {
    this.onChangePaidDt(this.statusRq?.paidDate);
  }


  onChangePaidDt(value) {
    console.log(value);
    this.statusRq.paidDate = value;
    this.request.emit(this.statusRq);
    this.form.emit(this.statusForm);
  }

  onSelectChange(event) {
    this.onChangePaidDt(event?.detail?.value);
  }
}
