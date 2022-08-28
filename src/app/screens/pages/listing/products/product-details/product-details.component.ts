import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Product } from 'src/app/screens/core/models/product';
import { ProductService } from 'src/app/screens/core/services/product.service';
import { ToastService, ToastType } from 'src/app/screens/shared/services/toast.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  product: Product;
  constructor(private toastCtrl: ToastController, private activatedRoute: ActivatedRoute, private common: CommonService, private productService: ProductService,private toastService:ToastService) {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  }

  ngOnInit() {
    this.getItemDetails();
  }


  getItemDetails() {
    this.common.showSpinner();
    this.productService.getProduct(this.id).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(item => {
      this.product = item;
    }, err => {

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

    // this.presentToast();
    this.toastService.showToast('Success',ToastType.INFO);
  }

}
