import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IInvoice, IInvoiceFilter } from '@core/models/invoice';
import { DataService } from '@core/services/data.service';
import { InvoiceService } from '@core/services/invoice.service';
import { NavController } from '@ionic/angular';
import { CommonService } from '@shared/services/common.service';
import { ToastService, ToastType } from '@shared/services/toast.service';
import { UtilsService } from '@shared/services/utils.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-filter-result',
  templateUrl: './invoice-filter-result.component.html',
  styleUrls: ['./invoice-filter-result.component.scss'],
})
export class InvoiceFilterResultComponent {


  filter: IInvoiceFilter;
  subscription: Subscription;

  invoices: IInvoice[] = [];
  page_number = 1;

  constructor(private data: DataService, private toastService: ToastService, private invoiceService: InvoiceService, private commonService: CommonService, private utilsService: UtilsService, public navCtrl: NavController, private router: Router) { }

  ionViewDidEnter() {
    this.subscription = this.data.currentMessage.subscribe(item => {
      this.filter = item?.data;
      console.log(this.filter);

      this.invoices = [];
      this.getItems(null);
    });
  }


  getItems(event) {
    this.commonService.showSpinner();
    this.invoiceService.filterInvoices(this.filter, this.utilsService.getRequestParams(this.page_number, 10, 'createdAt')).pipe(finalize(() => {
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

  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }


  backToSearch() {
    // this.router.navigate(['/invoice-filter']);
    this.navCtrl.navigateForward('invoice-filter', { animated: true });
  }

  collapsSymbole(order, dataArr) {
    for (let i = 0; i < dataArr.length; i++) {
      if (dataArr[i].referenceNumber == order.referenceNumber) {
        if (dataArr[i].expanded == true) {
          dataArr[i].expanded = false;
          return;
        } else {
          dataArr[i].expanded = true;
        }

      } else {
        dataArr[i].expanded = false;
      }

    }
  }



}
