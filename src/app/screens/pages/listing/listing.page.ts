import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../core/menu.model';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  menus: Menu[] = [];

  constructor(private menuService: MenuService, private router: Router) { }

  ngOnInit() {
    this.menus = this.menuService.getMenus();
  }



  openMenu(clickedItem: Menu) {
    // this.deActiveAllMenusExcept(item.id)

    clickedItem.active = true;
    this.menus.find(item => item.id != clickedItem.id).active = false;

    console.log(this.menus);

    this.router.navigate([ clickedItem.route], { replaceUrl: true });
  }


  deActiveAllMenusExcept(id: number) {
    this.menus.find(item => item.id == id).active = true;
    this.menus.find(item => item.id != id).active = false;
  }

}
