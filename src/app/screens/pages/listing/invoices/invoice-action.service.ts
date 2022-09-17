import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IInvoice, InvoiceStatusUpdate } from '@core/models/invoice';
import { InvoiceService } from '@core/services/invoice.service';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '@shared/services/api.service';
import { CommonService } from '@shared/services/common.service';
import { FileService } from '@shared/services/file.service';
import { ToastService, ToastType } from '@shared/services/toast.service';
import { UtilsService } from '@shared/services/utils.service';
import { finalize } from 'rxjs/operators';
import { InvoiceStatusControllerService } from './invoice-status/invoice-status-controller.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceActionService {

  invoice: IInvoice;

  constructor(private translateService: TranslateService, private toastService: ToastService, private invoiceService: InvoiceService, private commonService: CommonService, public navCtrl: NavController, private router: Router, private invoiceControllerService: InvoiceStatusControllerService, private modalCtrl: ModalController, private actionSheetController: ActionSheetController, private alertController: AlertController) {

  }

  async presentItemSheet(invoice: IInvoice, isDetailItem?: boolean) {

    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('invoice.action.label'),
      cssClass: 'sheet-class',
      buttons: this.sheetButtons(invoice, isDetailItem)
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }


  sheetButtons(invoice: IInvoice, isDetailItem) {
    let buttons = [];
    if (isDetailItem) {
      buttons = [{
        text: this.translateService.instant('invoice.action.print-invoice'),
        icon: 'print',
        data: invoice?.id,
        handler: () => {
          this.downloadPDF(invoice?.id);
        }
      }, {
        text: this.translateService.instant('invoice.action.print-taxbill'),
        icon: 'print',
        data: invoice?.id,
        handler: () => {
          this.downloadTaxBillPDF(invoice?.id);
        }
      }, {
        text: this.translateService.instant('invoice.action.delete'),
        icon: 'trash',
        data: invoice?.id,
        handler: () => {
          this.removeItem(invoice?.id);
        }
      },
      {
        text: this.translateService.instant('invoice.action.change-status'),
        icon: 'options',
        handler: () => {
          this.invoiceControllerService.openChangeStatusDialog(invoice);
        }
      }
        ,
      {
        text: this.translateService.instant('invoice.action.cancel'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }];

    } else {
      buttons = [{
        text: this.translateService.instant('invoice.action.details'),
        role: 'selected',
        icon: 'eye',
        id: 'details-button',
        data: invoice?.id,
        handler: () => {
          this.router.navigate(['invoice-details', invoice?.id]);
        }
      }, {
        text: this.translateService.instant('invoice.action.print-invoice'),
        icon: 'print',
        data: invoice?.id,
        handler: () => {
          this.downloadPDF(invoice?.id);
        }
      },
      {
        text: this.translateService.instant('invoice.action.print-taxbill'),
        icon: 'print',
        data: invoice?.id,
        handler: () => {
          this.downloadTaxBillPDF(invoice?.id);
        }
      }
        , {
        text: this.translateService.instant('invoice.action.delete'),
        icon: 'trash',
        data: invoice?.id,
        handler: () => {
          this.removeItem(invoice?.id);
        }
      },
      {
        text: this.translateService.instant('invoice.action.change-status'),
        icon: 'options',
        handler: () => {
          this.invoiceControllerService.openChangeStatusDialog(invoice);
        }
      }
        ,
      {
        text: this.translateService.instant('invoice.action.cancel'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }];
    }
    return buttons;
  }

  public downloadPDF(id): void {
    this.commonService.showSpinner();
    this.invoiceService.downloadInvoice(id).pipe(finalize(() => {
      this.commonService.hideSpinner();
    })).subscribe(data => {
      // this.fileService.openBlobFile(data, "application/pdf","invoice");

      const blob = new Blob([data], { type: "application/pdf" });
      FileService.writeAndOpenFile(blob, "invoice.pdf");
    }, err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });

  }



  public downloadTaxBillPDF(id): void {
    this.commonService.showSpinner();
    this.invoiceService.downloadTaxbill(id).pipe(finalize(() => {
      this.commonService.hideSpinner();
    })).subscribe(data => {
      // this.fileService.openBlobFile(data, "application/pdf","invoice");

      const blob = new Blob([data], { type: "application/pdf" });
      FileService.writeAndOpenFile(blob, "invoice.pdf");
    }, err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });

  }





  deleteInvoice(id) {
    this.commonService.showSpinner();
    this.invoiceService.deleteInvoice(id).pipe(finalize(() => {
      this.commonService.hideSpinner();
    })).subscribe(data => {
      this.toastService.showToast('Success Delete', ToastType.SUCCESS);
      this.router.navigate(['home/listing/invoices']);
    }, err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });
  }

  async removeItem(id) {
    const alert = await this.alertController.create({
      header: this.translateService.instant('invoice.action.delete'),
      message: this.translateService.instant('invoice.msg.confirm-delete'),
      buttons: [
        {
          text: this.translateService.instant('btn.yes'),
          handler: () => this.deleteInvoice(id),
        },
        {
          text: this.translateService.instant('btn.no'),
        }
      ]
    });

    alert.present();
  }



}
