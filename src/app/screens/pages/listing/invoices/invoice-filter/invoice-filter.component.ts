import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '@core/models/customer';
import { IInvoiceFilter, InvoiceStatus } from '@core/models/invoice';
import { Item, Product } from '@core/models/product';
import { CustomerService } from '@core/services/customer.service';
import { DataService } from '@core/services/data.service';
import { InvoiceService } from '@core/services/invoice.service';
import { ProductService } from '@core/services/product.service';
import { ModalController } from '@ionic/angular';
import { CommonService } from '@shared/services/common.service';
import { ToastService, ToastType } from '@shared/services/toast.service';
import { UtilsService } from '@shared/services/utils.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CustomerSelectDialogComponent } from '../../customers/customer-select-dialog/customer-select-dialog.page';

// import * as moment from 'moment';

@Component({
  selector: 'app-invoice-filter',
  templateUrl: './invoice-filter.component.html',
  styleUrls: ['./invoice-filter.component.scss'],
})
export class InvoiceFilterComponent {


  public searchInfoObj: any;
  public outstandingOrders = [];

  customers: Customer[];
  products: Product[];

  filter: IInvoiceFilter = {};

  newInvoiceStatus: InvoiceStatus;

  public selectedPeriod = 2;
  currentDate;

  // statusTypes: InvoiceStatus;
  public statusTypes = [{ key: 'NEW', value: 'جديد', class: 'build-badge__status-indeterminate' }, { key: 'PAID', value: 'مدفوعة', class: 'build-badge__status-success' }, { key: 'RETURNS', value: 'مرتجع', class: 'build-badge__status-warning' }, { key: 'CANCELED', value: 'ألغيت', class: 'build-badge__status-error' }, { key: 'PAID_PARTIALLY', value: 'مدفوعة جزئيا', class: 'build-badge__status-information' }, { key: 'SAMPLE', value: 'عينات', class: 'build-badge__status-indeterminate' }]


  constructor(public datepipe: DatePipe, private commonService: CommonService, private customerService: CustomerService,private modalCtrl: ModalController, private productService: ProductService, private toastService: ToastService, private invoiceService: InvoiceService, private utilsService: UtilsService, private data: DataService, private router: Router) {
    this.filter.fromDate = this.datepipe.transform(new Date(), 'YYYY-MM-dd');
    this.filter.toDate = this.datepipe.transform(new Date(), 'YYYY-MM-dd');
  }


  ionViewWillEnter() {
    console.log('Profile>>>');

    this.initData();
  }


  buildForm() {
    // this.form = this._fb.group({
    //   customer: ["", Validators.required],
    //   type: [ServiceType.INVOICE, Validators.required],
    //   totalPrice: 0,
    //   items: this._fb.array([])
    // });
  }




  initData() {



    console.log(this.currentDate);
    //  this.filter.fromDate=new Date(this.currentDate);
    //  this.filter.toDate=new Date(this.currentDate);

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

  search() {

    let item: Item = {
      data: this.filter
    }

    if (!item?.data?.customer)
      item.data.customer = null;


    console.log(item);


    this.router.navigate(['/invoice-filter-result']);
    this.data.shareData(item);

    // this.commonService.showSpinner();
    // this.invoiceService.filterInvoices(this.filter, this.utilsService.getRequestParams(0, 5, 'createdAt')).pipe(finalize(() => {
    //   this.commonService.hideSpinner();
    // })).subscribe(item => {
    //   console.log(item);
    //   // this.invoiceList = item?.content;
    //   // this.page.totalItems = item?.totalElements;
    // });
  }

  changePeriod(periodID) {
    this.selectedPeriod = periodID;
  }


  async openSearch() {
    const modal = await this.modalCtrl.create({
      component: CustomerSelectDialogComponent,
      componentProps: {
        title: "Customers",
        customers: this.customers,
      },
    });

    modal.present();

    const { data } = await modal.onWillDismiss();

    console.log(data);
    this.filter.customer = data;
    // this.order.symbol = data;
    // this.applySymbol(this.order);
  }
}
