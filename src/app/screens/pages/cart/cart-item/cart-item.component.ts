import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemInvoice } from '@core/models/invoice';
import { CartService } from '@core/services/cart.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements AfterViewInit, OnDestroy {

  formChangesSubscription: Subscription;
  @ViewChild('form') itemForm: NgForm;

  totalAmount$: Observable<number>;

  _item: ItemInvoice;

  @Input() set item(item: ItemInvoice) {
    this._item = item;
    console.log(this._item);
    this.totalAmount$ = this.cartService.getTotalAmtOfItem(this._item?.product?.id);
    // this.cartService.addItem(item);
  }

  @Output() onChangeItem = new EventEmitter();


  @Output() onFormChange = new EventEmitter();


  constructor(private cartService: CartService) {
    // this.cartService.getItem();
  }

  ionViewWillEnter() {

  }

  ngAfterViewInit(): void {
    this.formChangesSubscription = this.itemForm.form.valueChanges.subscribe(x => {
      console.log(x);

      this.onFormChange.emit(this.itemForm.form);

      console.log(this.itemForm.form);
    });
  }


  ngOnDestroy() {
    if (this.formChangesSubscription)
      this.formChangesSubscription.unsubscribe();
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
