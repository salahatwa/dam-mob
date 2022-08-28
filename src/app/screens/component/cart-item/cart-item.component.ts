import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemInvoice } from '@core/models/invoice';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {

  totalAmount$: Observable<number>;

  _item: ItemInvoice;

  @Input() set item(item: ItemInvoice) {
    this._item = item;
    console.log(this._item);
    this.totalAmount$ = this.cartService.getTotalAmtOfItem(this._item?.product?.id);
    // this.cartService.addItem(item);
  }

  @Output() onChangeItem = new EventEmitter();


  @Output() increaseB = new EventEmitter();
  @Output() decreaseB = new EventEmitter();


  @Output() increaseD = new EventEmitter();
  @Output() decreaseD = new EventEmitter();


  constructor(private cartService: CartService) {
    // this.cartService.getItem();
  }

  ionViewWillEnter() {
   
  }


  changeItem(item) {
    this.onChangeItem.emit(item);
  }
  onIncreaseQty() {
    this._item.quantity += 1;
    this.onChangeItem.emit(this._item);
  }

  onDecreaseQty() {
    this._item.quantity -= 1;
    this.onChangeItem.emit(this._item);
  }


  onIncreaseDiscount() {
    this._item.discount += 1;
    this.onChangeItem.emit(this._item);
  }
  onDecreaseDiscount() {
    this._item.discount -= 1;
    this.onChangeItem.emit(this._item);
  }

  onIncreaseBonus() {
    this._item.bonus += 1;
    this.onChangeItem.emit(this._item);
  }

  onDecreaseBonus() {
    this._item.bonus -= 1;
    this.onChangeItem.emit(this._item);
  }

}
