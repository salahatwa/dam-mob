import { Injectable } from '@angular/core';
import { IInvoice, InvoiceStatusUpdate } from '@core/models/invoice';
import { InvoiceService } from '@core/services/invoice.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiService } from '@shared/services/api.service';
import { CommonService } from '@shared/services/common.service';
import { ToastService, ToastType } from '@shared/services/toast.service';
import { finalize } from 'rxjs/operators';
import { InvoiceStatusDialogComponent } from './invoice-status-dialog/invoice-status-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class InvoiceStatusControllerService {

  invoice: IInvoice;

  constructor(private apiService: ApiService, private modalCtrl: ModalController, private toastService: ToastService, private invoiceService: InvoiceService, private common: CommonService, private alertController: AlertController) { }

  /**
   * 
   */
  async openChangeStatusDialog(invoice: IInvoice) {
    const modal = await this.modalCtrl.create({
      component: InvoiceStatusDialogComponent,
      componentProps: {
        invoice: invoice
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data);
      this.updateInvoiceStatus(data);
    }
  }



  // updateStatus(status, invoice: IInvoice, index: number) {
  //   let rq: InvoiceStatusUpdate = {
  //     status: status,
  //     id: invoice?.id
  //   };

  //   switch (status) {
  //     case 'PAID':
  //       const dialogRef = this.modalService.open(PaidDialogComponent);
  //       invoice.totalyPaid = true;
  //       dialogRef.componentInstance.invoice = invoice;

  //       dialogRef.result.then(result => {
  //         if (result) {
  //           rq.paidDate = result?.paidDate;
  //           this.updateInvoiceStatus(rq, index);
  //         }
  //       }).catch((res) => {

  //       });

  //       break;

  //     case 'CANCELED':
  //       const cdialogRef = this.modalService.open(ConfirmDialogComponent);

  //       cdialogRef.result.then(result => {
  //         if (result) {
  //           rq.cancel = result;
  //           this.updateInvoiceStatus(rq, index);

  //         }
  //       }).catch((res) => {

  //       });
  //       break;

  //     case 'RETURNS':
  //       const cdialogRef2 = this.modalService.open(ReturnsDialogComponent);
  //       cdialogRef2.componentInstance.invoice = invoice;
  //       cdialogRef2.result.then(result => {
  //         if (result) {
  //           console.log(result);
  //           rq.items = result?.items;
  //           rq.returnsDate = result?.returnsDate;
  //           rq.id = result?.id;
  //           this.updateInvoiceStatus(rq, index);

  //         }
  //       }).catch((res) => {

  //       });
  //       break;

  //     case 'PAID_PARTIALLY':
  //       const dialogRef3 = this.modalService.open(PaidDialogComponent);
  //       invoice.totalyPaid = false;
  //       dialogRef3.componentInstance.invoice = invoice;

  //       dialogRef3.result.then(result => {
  //         if (result) {
  //           rq.paidDate = result?.paidDate;
  //           rq.paidAmt = result?.paidAmt;
  //           this.updateInvoiceStatus(rq, index);
  //         }
  //       }).catch((res) => {

  //       });

  //       break;
  //       break;

  //     default:
  //       // this.updateInvoiceStatus(rq);
  //       break;
  //   }

  // }

  updateInvoiceStatus(rq: InvoiceStatusUpdate) {
    this.common.showSpinner();
    this.invoiceService.updateInvoiceStatus(rq).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(data => {
      this.toastService.showToast('Success changed status', ToastType.SUCCESS);
    }, err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });
  }

}
