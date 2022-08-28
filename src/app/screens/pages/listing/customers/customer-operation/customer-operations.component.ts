import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Customer } from '@core/models/customer';
import { CustomerService } from '@core/services/customer.service';
import { ToastController } from '@ionic/angular';
import { CommonService } from '@shared/services/common.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-customer-operations',
  templateUrl: './customer-operations.component.html',
  styleUrls: ['./customer-operations.component.scss'],
})
export class CustomerOperationsComponent implements OnInit {


  customer: Customer;
  customerForm: FormGroup;
  constructor(private fb: FormBuilder, private toastCtrl: ToastController, private activatedRoute: ActivatedRoute, private common: CommonService, public customerService: CustomerService) {
    this.initForm({});
  }

  ngOnInit() {

    // this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];
          if (id.toUpperCase() != 'NEW')
            this.getCustomerDetails(id);

        }
      );



  }


  initForm(customer: Customer) {
    this.customerForm = this.fb.group({
      'id': [customer?.id],
      'name': [customer?.name, [Validators.required, Validators.pattern('[0-9a-zA-Z\s\u0600-\u06FF]*')]],
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
        this.presentToast();
        // this.alertService.success(this.translateService.instant('notify.success.add'), this.alert);
      }, err => {
        // this.alertService.error(err.message, this.alert);
      });

    else {
      this.customerService.updateCustomer(customer).pipe(finalize(() => {
        this.common.hideSpinner();
      })).subscribe(data => {
        this.presentToast();
        // this.alertService.success(this.translateService.instant('notify.success.update'), this.alert);
      }, err => {
        // this.alertService.error(err.message, this.alert);
      });
    }
    // this.resetForm(customerForm);

  }


  getCustomerDetails(id) {
    this.common.showSpinner();
    this.customerService.getCustomer(id).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(item => {
      console.log(item);
      this.initForm(item);
    }, err => {
      this.customer = {
        name: 'SALA',
        address: 'Benha',
        phone: '011669668498',
        email: 'salah@gmail.com',
        state: 'Cairo'
      }
    });
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

    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Food added to the cart',
      mode: 'ios',
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }


}
