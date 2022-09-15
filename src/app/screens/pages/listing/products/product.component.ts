import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@core/models/product';
import { ProductService } from '@core/services/product.service';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '@shared/services/common.service';
import { ToastService, ToastType } from '@shared/services/toast.service';
import { TranslateConfigService } from '@shared/services/translate.config.service';
import { UtilsService } from '@shared/services/utils.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  page_number = 1;
  products: Product[] = [];

  constructor(private translateService: TranslateService,
    private tr: TranslateConfigService, private productService: ProductService, private common: CommonService, private router: Router, private utilsService: UtilsService, private modalCtrl: ModalController, private actionSheetController: ActionSheetController, private toastService: ToastService, private alertController: AlertController) {
    tr.getCurrentLang().then((currLang) => {
      this.translateService.setDefaultLang(currLang);
    });
  }

  goToDetailPage(id: number) {
    console.log(id);
    this.router.navigate(['product-details', id]);
  }

  ngOnInit() {
    this.getItems(null);
  }



  getItems(event) {
    if (!event || event == null)
      this.page_number = 1;

    this.common.showSpinner();

    this.productService.getProducts(this.utilsService.getRequestParams(this.page_number, 10, 'createdAt')).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(item => {
      let items = item?.content;

      for (let i = 0; i < items.length; i++) {
        this.products.push(items[i]);
      }
      if (event)
        event.target.complete();

      this.page_number++;
    });
  }



  async presentItemSheet(id) {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('product.action.label'),
      cssClass: 'sheet-class',
      buttons: [{
        text: this.translateService.instant('product.action.details'),
        role: 'selected',
        icon: 'eye',
        id: 'details-button',
        data: id,
        handler: () => {
          this.router.navigate(['product-details', id]);
        }
      }, {
        text: this.translateService.instant('product.action.update'),
        icon: 'create',
        data: id,
        handler: () => {
          this.router.navigate(['product-opt', id]);
        }
      }, {
        text: this.translateService.instant('product.action.delete'),
        icon: 'trash',
        data: id,
        handler: () => this.removeItem(id)
      },
      {
        text: this.translateService.instant('product.action.cancel'),
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


  deleteProduct(id) {
    this.common.showSpinner();
    this.productService.deleteProduct(id).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(data => {
      this.toastService.showToast('Success Delete', ToastType.SUCCESS);
      this.products = [];
      this.getItems(null);
    }, err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });
  }


  async removeItem(id) {
    console.log(id);
    const alert = await this.alertController.create({
      header: this.translateService.instant('product.action.delete'),
      message: this.translateService.instant('product.msg.confirm-delete'),
      buttons: [
        {
          text: this.translateService.instant('btn.yes'),
          handler: () => this.deleteProduct(id),
        },
        {
          text: this.translateService.instant('btn.no'),
        }
      ]
    });

    alert.present();
  }

}
