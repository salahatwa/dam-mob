import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IInvoice, ItemInvoice } from '@core/models/invoice';
import { User } from '@core/models/user.model';
import { InvoiceService } from '@core/services/invoice.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { UserService } from '@shared/services/auth/user.service';
import { CommonService } from '@shared/services/common.service';
import { ToastService, ToastType } from '@shared/services/toast.service';
import { Observable, Observer } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { InvoiceActionService } from '../invoice-action.service';
import { InvoiceStatusControllerService } from '../invoice-status/invoice-status-controller.service';
@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  id: string;
  invoice: IInvoice;
  currentUser: User;

  base64ImageString;

  constructor(private invoiceActionService: InvoiceActionService, private invoiceControllerService: InvoiceStatusControllerService, private router: Router, private activatedRoute: ActivatedRoute, private common: CommonService, private invoiceService: InvoiceService, private userService: UserService, private toastService: ToastService, private alertController: AlertController, private actionSheetController: ActionSheetController) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getUserDtls();
    this.getInvoiceDetails();
  }



  getUserDtls() {
    // this.common.showSpinner();
    this.userService.getUserDtls().pipe(finalize(() => {
      // this.common.hideSpinner();
    })).subscribe((data => {
      this.currentUser = data;
      this.getBase64ImageFromURL(this.currentUser?.companyLogo).subscribe((base64Data: string) => {
        this.base64ImageString = base64Data;
      });
    }), err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });
  }

  getInvoiceDetails() {
    this.common.showSpinner();
    this.invoiceService.getInvoice(this.id).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(item => {
      this.invoice = item;
    }, err => {


    });
  }


  itemTotalAfterDiscount(item: ItemInvoice) {
    let amount = (item?.quantity * item?.product?.price);
    if (item?.discount) {
      let discount = amount - ((amount * item?.discount) / 100);
      amount = discount;
    }
    return amount;
  }

  itemSubtotal(invoice: IInvoice) {
    let totalSum = 0;
    invoice?.items.forEach((item) => {
      totalSum += this.itemTotalAfterDiscount(item);
    });
    return totalSum;
  }

  /* Method to fetch image from Url */
  getBase64ImageFromURL(url: string): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  /* Method to create base64Data Url from fetched image */
  getBase64Image(img: HTMLImageElement): string {
    // We create a HTML canvas object that will create a 2d image
    var canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    // This will draw image
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    let dataURL: string = canvas.toDataURL("image/png");
    // this.base64ImageString = dataURL;
    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    return dataURL;
  }




  addItemToCart() {
    // const cartItem: CartItem = {
    //   id: this.food.id,
    //   name: this.food.title,
    //   price: this.food.price,
    //   image: this.food.image,
    //   quantity: 1
    // };

    // this.cartService.addToCart(cartItem);

    // this.presentToast();
  }


  collapsSymbole(item, dataArr) {
    console.log('collapse clicked');
    for (let i = 0; i < dataArr.length; i++) {
      if (dataArr[i].id == item.id) {
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



  async presentItemSheet(invoice: IInvoice) {
    this.invoiceActionService.presentItemSheet(invoice,true);
  }


}
