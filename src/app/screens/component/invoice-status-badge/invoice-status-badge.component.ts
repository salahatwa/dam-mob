import { Component, Input, OnInit } from '@angular/core';
import { InvoiceStatus } from '@core/models/invoice';

@Component({
  selector: 'dam-invoice-status-badge',
  templateUrl: './invoice-status-badge.component.html',
  styleUrls: ['./invoice-status-badge.component.scss'],
})
export class InvoiceStatusBadgeComponent implements OnInit {

  _status: InvoiceStatus;
  statusColor: string = 'primary';
  statusKey: string = '';
  @Input() set status(status: InvoiceStatus) {
    this._status = status;
    switch (+InvoiceStatus[status]) {

      case InvoiceStatus.NEW:
        this.statusColor = 'primary';
        this.statusKey='status.new';
        break;
      case InvoiceStatus.PAID:
        this.statusColor = 'success';
        this.statusKey='status.paid';
        break;
      case InvoiceStatus.PAID_PARTIALLY:
        this.statusColor = 'warning';
        this.statusKey='status.paid_partially';
        break;
      case InvoiceStatus.CANCELED:
        this.statusColor = 'danger';
        this.statusKey='status.canceled';
        break;
      case InvoiceStatus.RETURNS:
        this.statusColor = 'secondary';
        this.statusKey='status.returns';
        break;

      default:
        this.statusColor = 'primary';
        break;
    }

  }

  constructor() { }

  ngOnInit() { }

}
