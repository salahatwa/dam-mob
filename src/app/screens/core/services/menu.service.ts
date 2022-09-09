import { Injectable } from "@angular/core";
import { Menu } from "../models/menu.model";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    constructor() { }


    getMenus(): Menu[] {
        return [
            {
                id: 1,
                label: 'category.product',
                route: '/home/listing/products',
                image: 'assets/icon/products.svg',
                active: true
            },
            {
                id: 2,
                label: 'category.customer',
                route: '/home/listing/customers',
                image: 'assets/icon/portfolios.svg',
                active: false
            },
            {
                id: 3,
                label: 'category.invoice',
                route: '/home/listing/invoices',
                image: 'assets/icon/reports.svg',
                active: false
            },

        ];
    }


    getMenu(id: number): Menu {
        return this.getMenus().find((item) => item.id == id);
    }


    deActiveAllMenusExcept(id: number) {
        this.getMenus().find(item => item.id == id).active = true;
        this.getMenus().find(item => item.id != id).active = false;
    }
}