import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '@core/models/customer';
import { CustomerService } from '@core/services/customer.service';
import { ActionSheetController, AlertController, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '@shared/services/common.service';
import { ToastService, ToastType } from '@shared/services/toast.service';
import { UtilsService } from '@shared/services/utils.service';
import { finalize } from 'rxjs/operators';
import { CustomerSelectDialogComponent } from './customer-select-dialog/customer-select-dialog.page';


// Typescript custom enum for search types (optional)
export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  page_number = 1;
  customers: Customer[] = [];
  searchTerm: string = '';
  type: SearchType = SearchType.all;

  /**
   * Constructor of our first page
   * @param movieService The movie Service to get data
   */
  constructor(private translateService: TranslateService, private toastService: ToastService, private customerService: CustomerService, private common: CommonService, private router: Router, private utilsService: UtilsService, private modalCtrl: ModalController, private actionSheetController: ActionSheetController, private alertController: AlertController) {

  }

  ngOnInit() {
    this.getItems(null);
  }



  getItems(event) {
    this.common.showSpinner();

    if (!event || event == null)
      this.page_number = 1;

    this.customerService.getCustomers(this.utilsService.getRequestParams(this.page_number, 10, 'createdAt')).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(item => {
      let items = item?.content;

      for (let i = 0; i < items.length; i++) {
        this.customers.push(items[i]);
      }
      if (event)
        event.target.complete();

      this.page_number++;
    });
  }

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


  async presentItemSheet(id) {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('action.label'),
      cssClass: 'sheet-class',
      buttons: [{
        text: this.translateService.instant('action.details'),
        role: 'selected',
        icon: 'eye',
        id: 'details-button',
        data: id,
        handler: () => {
          this.router.navigate(['customer-details', id]);
        }
      }, {
        text: this.translateService.instant('action.update'),
        icon: 'create',
        data: id,
        handler: () => {
          this.router.navigate(['customer-opt', id]);
        }
      }, {
        text: this.translateService.instant('action.delete'),
        icon: 'trash',
        data: id,
        handler: () => {
          this.removeItem(id);
        }
      },
      {
        text: this.translateService.instant('action.cancel'),
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


  deleteCustomer(id) {
    this.common.showSpinner();
    this.customerService.deleteCustomer(id).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(data => {
      this.toastService.showToast('Success Delete', ToastType.SUCCESS);
      this.customers = [];

      this.getItems(null);
    }, err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });
  }


  async removeItem(id) {
    const alert = await this.alertController.create({
      header: this.translateService.instant('action.delete'),
      message: this.translateService.instant('msg.confirm-delete'),
      buttons: [
        {
          text: this.translateService.instant('btn.yes'),
          handler: () => this.deleteCustomer(id),
        },
        {
          text: this.translateService.instant('btn.no'),
        }
      ]
    });

    alert.present();
  }
}
