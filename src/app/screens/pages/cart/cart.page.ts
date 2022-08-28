import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '@core/models/customer';
import { IInvoice, ItemInvoice, ServiceType } from '@core/models/invoice';
import { Product } from '@core/models/product';
import { CustomerService } from '@core/services/customer.service';
import { InvoiceService } from '@core/services/invoice.service';
import { ProductService } from '@core/services/product.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CommonService } from '@shared/services/common.service';
import { ToastService, ToastType } from '@shared/services/toast.service';
import {  forkJoin, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { SearchPage } from '../listing/customers/search/search.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartItems$: Observable<ItemInvoice[]>;

  totalAmount$: Observable<number>;

  customers: Customer[];
  products: Product[];

  invoice: IInvoice;

  form: FormGroup;

  // constructor(private cartService: CartService, private alertController: AlertController) { }

  constructor(private modalCtrl: ModalController, private cartService: CartService, private commonService: CommonService, private _fb: FormBuilder, private invoiceService: InvoiceService, private customerService: CustomerService, private productService: ProductService, private alertController: AlertController, private toastService: ToastService) {
    this.buildForm();
  }


  ngOnInit() {
    this.totalAmount$ = this.cartService.getTotalAmount();
  }

  ionViewWillEnter() {
    console.log('Profile>>>');

    this.cartItems$ = this.cartService.getCart();
    this.cartService.removeAllItem();

    this.initData();
  }


  buildForm() {
    this.form = this._fb.group({
      customer: ["", Validators.required],
      type: [ServiceType.INVOICE, Validators.required],
      totalPrice: 0,
      items: this._fb.array([])
    });
  }



  onChangeProduct(event) {
    let products: Product[] = event.detail.value;

    if (products?.length <= 0)
      this.cartService.removeAllItem();

    for (let product of products) {
      if (this.cartService.isItemExist(product?.id)) {
        let invoiceItem: ItemInvoice = {
          quantity: 0,
          bonus: 0,
          discount: 0,
          product: product
        }

        this.cartService.addToCart(invoiceItem);
      }
    }


  }

  initData() {
    this.commonService.showSpinner();
    forkJoin(
      this.customerService.getAllCustomers(),
      this.productService.getAllProducts()
    ).pipe(finalize(() => this.commonService.hideSpinner())).subscribe(
      data => {
        this.customers = data[0];
        this.products = data[1];
      },
      err => this.toastService.showToast(err?.message, ToastType.DANGER)
    );
  }


  onChangeItem(item: ItemInvoice) {
    console.log(item);
    if (item.quantity < 0 || item.bonus < 0 || item.discount < 0) this.removeFromCart(item);
    this.cartService.onChangeItem(item, item.product.id);
  }




  async removeFromCart(item: ItemInvoice) {
    console.log(item);
    const alert = await this.alertController.create({
      header: 'Remove',
      message: 'Are you sure you want to remove?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.cartService.removeItem(item.product.id),
        },
        {
          text: 'No',
        }
      ]
    });

    alert.present();
  }

  async openSearch() {
    const modal = await this.modalCtrl.create({
      component: SearchPage,
      componentProps: {
        title: "Customers",
        customers: this.customers,
        color: true ? "#21bf73" : "#da2d2d",
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    console.log(data);
    this.form.get('customer').setValue(data);
    // this.order.symbol = data;
    // this.applySymbol(this.order);
  }


  createInvoice() {
    console.log('CLICKED..');

    console.log(this.form.value);
    this.commonService.showSpinner();
    const result: IInvoice = {
      items: this.cartService.getAllItems(),
      customer: this.form.value.customer,
      type: ServiceType.INVOICE
    }

    this.invoiceService.insertInvoice(result).pipe(finalize(() => {
      this.commonService.hideSpinner();
    })).subscribe((data => {
      console.log('DONE');
    }));

  }

}
