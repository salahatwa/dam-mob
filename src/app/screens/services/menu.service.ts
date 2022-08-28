import { Injectable } from "@angular/core";
import { Menu } from "../core/menu.model";

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    constructor() { }


    getMenus(): Menu[] {
        return [
            {
                id: 1,
                label: 'Products',
                route: '/home/listing/products',
                image: 'assets/images/avatar-alt.png',
                active: true
            },
            {
                id: 2,
                label: 'Customers',
                route: '/home/listing/customers',
                image: 'assets/images/avatar-alt.png',
                active: false
            },
            {
                id: 2,
                label: 'Invoices',
                route: '/home/listing/invoices',
                image: 'assets/images/avatar-alt.png',
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