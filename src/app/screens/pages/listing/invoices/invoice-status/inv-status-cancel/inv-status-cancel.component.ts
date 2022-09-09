import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IInvoice, InvoiceStatus, InvoiceStatusUpdate } from '@core/models/invoice';


@Component({
  selector: 'app-inv-status-cancel',
  templateUrl: './inv-status-cancel.component.html',
  styleUrls: ['./inv-status-cancel.component.scss'],
})
export class InvStatusCancelComponent implements AfterViewInit {

  statusRq: InvoiceStatusUpdate = {};

  @Output() request = new EventEmitter();
  @Output() form = new EventEmitter();


  _invoice: IInvoice;

  @Input() set invoice(invoice: IInvoice) {
    this._invoice = invoice;
    this.statusRq.id = this._invoice.id;
    this.statusRq.status = InvoiceStatus.CANCELED;
  }


  constructor() {
  }

  ngAfterViewInit() {
    this.request.emit(this.statusRq);
    this.form.emit(true);
  }

}
