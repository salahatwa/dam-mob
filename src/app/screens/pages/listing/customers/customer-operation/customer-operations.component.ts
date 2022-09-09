import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Customer } from '@core/models/customer';
import { CustomerService } from '@core/services/customer.service';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '@shared/services/common.service';
import { ToastService, ToastType } from '@shared/services/toast.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-customer-operations',
  templateUrl: './customer-operations.component.html',
  styleUrls: ['./customer-operations.component.scss'],
})
export class CustomerOperationsComponent implements OnInit {


  customer: Customer;
  customerForm: FormGroup;
  constructor(private translateService: TranslateService, private toastService: ToastService, private fb: FormBuilder, private toastCtrl: ToastController, private activatedRoute: ActivatedRoute, private common: CommonService, public customerService: CustomerService) {

    this.initForm({});
  }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];
          if (id.toUpperCase() != 'NEW')
            this.getItemDetails(id);
        }
      );

  }


  initForm(customer: Customer) {
    this.customerForm = this.fb.group({
      'id': [customer?.id],
      'name': [customer?.name, [Validators.required]],
      'state': [customer?.state, [Validators.required, Validators.pattern('[0-9a-zA-Z\s\u0600-\u06FF]*')]],
      'email': [customer?.email, [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      'phone': [customer?.phone, []],
      'address': [customer?.address, [Validators.required, Validators.pattern('[0-9a-zA-Z\s\u0600-\u06FF]*')]]
    });
  }


  get f() {
    return this.customerForm.controls;
  }



  onSubmit() {
    this.common.showSpinner();

    let customer = this.customerForm.value;

    console.log(customer);

    if (customer.id == null)
      this.customerService.insertCustomer(customer).pipe(finalize(() => {
        this.common.hideSpinner();
      })).subscribe(data => {
        this.toastService.showToast(this.translateService.instant('msg.success.add'), ToastType.SUCCESS);
      }, err => {
        this.toastService.showToast(err.message, ToastType.DANGER);
      });

    else {
      this.customerService.updateCustomer(customer).pipe(finalize(() => {
        this.common.hideSpinner();
      })).subscribe(data => {
        this.toastService.showToast(this.translateService.instant('msg.success.update'), ToastType.SUCCESS);
      }, err => {
        this.toastService.showToast(err.message, ToastType.DANGER);
      });
    }
  }


  getItemDetails(id) {
    this.common.showSpinner();
    this.customerService.getCustomer(id).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(customer => {
      console.log(customer);
      this.customer = customer;
      this.initForm(customer);
    }, err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });
  }



}
