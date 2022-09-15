import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IInvoice, IInvoiceFilter } from '@core/models/invoice';
import { InvoiceService } from '@core/services/invoice.service';
import { ActionSheetController, AlertController, IonInfiniteScroll, ModalController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '@shared/services/common.service';
import { ToastService, ToastType } from '@shared/services/toast.service';
import { UtilsService } from '@shared/services/utils.service';
import { finalize } from 'rxjs/operators';
import { CustomerSelectDialogComponent } from '../../customers/customer-select-dialog/customer-select-dialog.page';
import { InvoiceActionService } from '../invoice-action.service';
import { InvoiceStatusControllerService } from '../invoice-status/invoice-status-controller.service';

@Component({
  selector: 'dam-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @Input() set filter(filter: IInvoiceFilter) {
    if (filter) {
      this._filter = filter;
      this.invoices = [];
      this.getItems(null);
    }
  }

  _filter: IInvoiceFilter;
  invoices: IInvoice[] = [];


  page_number = 1;

  constructor(private invoiceActionService: InvoiceActionService, private translateService: TranslateService, private toastService: ToastService, private invoiceService: InvoiceService, private commonService: CommonService, private utilsService: UtilsService, public navCtrl: NavController, private router: Router, private invoiceControllerService: InvoiceStatusControllerService, private modalCtrl: ModalController, private actionSheetController: ActionSheetController, private alertController: AlertController) {

  }


  ngOnInit() { }



  async openModal() {
    const modal = await this.modalCtrl.create({
      component: CustomerSelectDialogComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`Hello, ${data}!`);
    }
  }



  getItems(event) {
    this.commonService.showSpinner();
    this.invoiceService.filterInvoices(this._filter, this.utilsService.getRequestParams(this.page_number, 10, 'createdAt')).pipe(finalize(() => {
      this.commonService.hideSpinner();
    })).subscribe(item => {
      let items = item?.content;

      for (let i = 0; i < items.length; i++) {
        this.invoices.push(items[i]);
      }
      if (event)
        event.target.complete();

      this.page_number++;

    }, err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });
  }



  async presentItemSheet(invoice: IInvoice) {
    this.invoiceActionService.presentItemSheet(invoice);
  }




}
