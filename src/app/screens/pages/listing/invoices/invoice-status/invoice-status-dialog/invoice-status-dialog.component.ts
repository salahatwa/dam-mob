import { AfterViewInit, Component, Input } from '@angular/core';
import { IInvoice, InvoiceStatus, InvoiceStatusUpdate } from '@core/models/invoice';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-invoice-status-dialog',
  templateUrl: './invoice-status-dialog.component.html',
  styleUrls: ['./invoice-status-dialog.component.scss'],
})
export class InvoiceStatusDialogComponent implements AfterViewInit {

  @Input() invoice: IInvoice;

  statusRq: InvoiceStatusUpdate = {};

  newInvoiceStatus: InvoiceStatus;


  // { key: 'SAMPLE', value: 'عينات', class: 'build-badge__status-indeterminate' }
  // { key: 'RETURNS', value: 'مرتجع', class: 'build-badge__status-warning' }

  public statusTypes = [{ key: 'NEW', value: 'جديد', class: 'build-badge__status-indeterminate' }, { key: 'PAID', value: 'مدفوعة', class: 'build-badge__status-success' }, { key: 'CANCELED', value: 'ألغيت', class: 'build-badge__status-error' }, { key: 'PAID_PARTIALLY', value: 'مدفوعة جزئيا', class: 'build-badge__status-information' }]

  public toStatusTypes;

  isValidForm: boolean = false;

  constructor(private translateService: TranslateService, private modalCtrl: ModalController, private alertController: AlertController) {

  }

  ngAfterViewInit() {
    this.toStatusTypes = this.statusTypes.filter(obj => obj.key !== this.invoice?.status + '');
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }


  // const res = data.filter(obj => obj.id !== removeId);

  onStatusChanged(value) {
    this.newInvoiceStatus = value;
  }


  async confirm() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('invoice.msg.confirm-change-status'),
      cssClass: 'custom-alert',
      buttons: [
        {
          text: this.translateService.instant('btn.yes'),
          cssClass: 'alert-button-confirm',
          handler: () => this.modalCtrl.dismiss(this.statusRq, 'confirm'),
        },
        {
          text: this.translateService.instant('btn.no'),
          cssClass: 'alert-button-cancel',
        }
      ],
    });

    await alert.present();
  }

}
