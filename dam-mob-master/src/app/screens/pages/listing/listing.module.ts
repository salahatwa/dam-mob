import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingPageRoutingModule } from './listing-routing.module';

import { MenuItemModule } from '../../component/menu-item/menu-item.module';
import { SearchbarModule } from '../../component/searchbar/searchbar.module';
import { ListingPage } from './listing.page';
import { SharedModule } from '../../shared/component/shared.module';
import { TranslationModule } from '../../shared/component/translation.module';

@NgModule({
  imports: [
    SharedModule,
    ListingPageRoutingModule,
    SearchbarModule,
    MenuItemModule,
  ],
  declarations: [ListingPage],
  exports: [
    // ListingPageRoutingModule
  ]

})
export class ListingPageModule { }
