import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CartItem } from '../../models/cart-item.model';
import { Food } from '../../models/food.model';
import { CartService } from '../../services/cart.service';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: number;
  food: Food;

  constructor(private toastCtrl: ToastController, private activatedRoute: ActivatedRoute, private foodService: FoodService, private cartService: CartService) {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.food = this.foodService.getFood(this.id);
  }

  addItemToCart() {
    const cartItem: CartItem = {
      id: this.food.id,
      name: this.food.title,
      price: this.food.price,
      image: this.food.image,
      quantity: 1
    };

    this.cartService.addToCart(cartItem);

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
