import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from '@shared/services/translate.config.service';
import { Menu } from '../../core/models/menu.model';
import { MenuService } from '../../core/services/menu.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  menus: Menu[] = [];

  isInvoicesPage = false;


  constructor(private translate: TranslateService, private translateConfigService: TranslateConfigService, private menuService: MenuService, private router: Router) {

  }


  switchLang() {
    if (this.translate.currentLang === 'ar') {
      this.translateConfigService.setLanguage('en');
    }
    else {
      this.translateConfigService.setLanguage('ar');
    }

  }

  ngOnInit() {
    this.menus = this.menuService.getMenus();

    if (this.router.url.includes('invoices')) {
      this.isInvoicesPage = true;
    }
  }



  openMenu(clickedItem: Menu) {
    clickedItem.active = true;
    this.menus.find(item => item.id != clickedItem.id).active = false;
    this.router.navigate([clickedItem.route], { replaceUrl: true });
  }


  deActiveAllMenusExcept(id: number) {
    this.menus.find(item => item.id == id).active = true;
    this.menus.find(item => item.id != id).active = false;
  }

  createCustomer() {
    this.router.navigate(['/customer-opt/new']);
  }

  createProduct() {
    this.router.navigate(['/product-opt/new']);
  }


  isActive(url: string): boolean {
    return this.router.isActive(this.router.createUrlTree([url]), true);
  }

}
