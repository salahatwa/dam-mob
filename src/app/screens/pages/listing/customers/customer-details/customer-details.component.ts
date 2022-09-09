import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '@core/models/customer';
import { CustomerService } from '@core/services/customer.service';
import { ToastController } from '@ionic/angular';
import { CommonService } from '@shared/services/common.service';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  id: number;
  customer: Customer;
  constructor(private toastCtrl: ToastController, private activatedRoute: ActivatedRoute, private common: CommonService, private customerService: CustomerService) {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() { 
    this.getCustomerDetails();
  }


  getCustomerDetails() {
    this.common.showSpinner();
    this.customerService.getCustomer(this.id).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(item => {
      this.customer = item;
    },err=>{
      this.customer={
        name:'SALA',
        address:'Benha',
        phone:'011669668498',
        email:'salah@gmail.com',
        state:'Cairo'
      }
    });
  }


  // constructor(private toastCtrl: ToastController, private activatedRoute: ActivatedRoute, private foodService: FoodService, private cartService: CartService) {
  //   this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  // }


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
