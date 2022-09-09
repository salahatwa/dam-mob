import { Injectable } from "@angular/core";
import { ItemInvoice } from "@core/models/invoice";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private items$ = new BehaviorSubject<ItemInvoice[]>([]);

    constructor() { }


    getCart() {
        return this.items$.asObservable();
    }


    addToCart(item: ItemInvoice) {
        this.items$.next([...this.items$.getValue(), item]);
    }

    removeItem(id: string) {

        const items: ItemInvoice[] = this.items$.getValue();

        items.forEach((item, index) => {
            if (item.product.id === id) { items.splice(index, 1); }
        });

        this.items$.next(items);
    }

    removeAllItem() {
        this.items$.next([]);
    }



    getAllItems(): ItemInvoice[] {
        return this.items$.getValue();
    }

    isItemExist(productId) {
        let items: ItemInvoice[] = this.items$.getValue();
        const index = items.findIndex((item) => item.product.id == productId);
        return index < 0 ? true : false;
    }

    onChangeItem(item: ItemInvoice, id: string) {
        const items = this.items$.getValue();
        const index = items.findIndex((item) => item.product.id == id);
        items[index].quantity = item.quantity;
        items[index].bonus = item.bonus;
        items[index].discount = item.discount;
        this.items$.next(items);
    }



    getTotalAmount() {
        return this.items$.pipe(map((items) => {
            let total = 0;
            items.forEach((item) => {
                total += this.calculateTotal(item);
            });
            return total;
        }));
    }

    getTotalAmtOfItem(productId) {
        return this.items$.pipe(map((items) => {
            const index = items.findIndex((item) => item.product.id == productId);
            return this.calculateTotal(items[index]);
        }));
    }

    private calculateTotal(item: ItemInvoice) {
        let total = 0;
        total += item?.quantity * item?.product.price;
        if (item?.discount > 0) {
            total = total - ((total * item?.discount) / 100);
        }
        return total;
    }

}