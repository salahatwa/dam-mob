import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IInvoice } from '@core/models/invoice';
import { InvoiceService } from '@core/services/invoice.service';
import { ActionSheetController, AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { CommonService } from '@shared/services/common.service';
import { FileService } from '@shared/services/file.service';
import { ToastService, ToastType } from '@shared/services/toast.service';
import { UtilsService } from '@shared/services/utils.service';
import { finalize } from 'rxjs/operators';
import { CustomerFilterDialogComponent } from '../customers/customer-filter-dialog/customer-filter-dialog.component';



@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {


  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  page_number = 1;
  invoices: IInvoice[] = [];
  searchTerm: string = '';


  /**
   * Constructor of our first page
   * @param movieService The movie Service to get data
   */
  constructor(private fileService: FileService, private invoiceService: InvoiceService, private common: CommonService, private router: Router, private utilsService: UtilsService, private modalCtrl: ModalController, private actionSheetController: ActionSheetController, private toastService: ToastService, private alertController: AlertController) { }

  ngOnInit() {
    this.getItems(null);
  }



  getItems(event) {
    this.common.showSpinner();
    this.invoiceService.getInvoices(this.utilsService.getRequestParams(this.page_number, 10, 'createdAt')).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(item => {
      let items = item?.content;

      for (let i = 0; i < items.length; i++) {
        this.invoices.push(items[i]);
      }
      if (event)
        event.target.complete();

      this.page_number++;
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CustomerFilterDialogComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`Hello, ${data}!`);
    }
  }


  async presentItemSheet(id) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'sheet-class',
      buttons: [{
        text: 'Details',
        role: 'selected',
        icon: 'eye',
        id: 'details-button',
        data: id,
        handler: () => {
          this.router.navigate(['invoice-details', id]);
        }
      }, {
        text: 'Print',
        icon: 'create',
        data: id,
        handler: () => {
          this.downloadPDF(id);
          // this.router.navigate(['customer-opt', id]);
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        data: id,
        handler: () => {
          this.removeItem(id);
        }
      },
      // {
      //   text: 'Favorite',
      //   icon: 'heart',
      //   handler: () => {
      //     console.log('Favorite clicked');
      //   }
      // }
      // ,
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }



  public downloadPDF(id): void {
    this.common.showSpinner();
    this.invoiceService.downloadInvoice(id).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(data => {
      // this.fileService.openBlobFile(data, "application/pdf","invoice");

      const blob = new Blob([data], { type: "application/pdf" });
      FileService.writeAndOpenFile(blob, "invoice.pdf");
    }, err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });

  }





  deleteInvoice(id) {
    this.common.showSpinner();
    this.invoiceService.deleteInvoice(id).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(data => {
      this.toastService.showToast('Success Delete', ToastType.SUCCESS);
      this.invoices = [];
      this.getItems(null);
    }, err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });
  }


  async removeItem(id) {
    const alert = await this.alertController.create({
      header: 'Remove',
      message: 'Are you sure you want to remove?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.deleteInvoice(id),
        },
        {
          text: 'No',
        }
      ]
    });

    alert.present();
  }

}
