import { NgModule } from '@angular/core';


import { ListingPageRoutingModule } from './listing-routing.module';

import { SearchbarModule } from '../../component/searchbar/searchbar.module';
import { SharedModule } from '../../shared/component/shared.module';
import { ListingPage } from './listing.page';
import { ListingTranslationModule } from './listing.translation.module';
import { MenuItemComponent } from './menu-item/menu-item.component';



@NgModule({
  imports: [
    SharedModule,
    ListingPageRoutingModule,
    SearchbarModule,
    ListingTranslationModule
  ],
  declarations: [ListingPage, MenuItemComponent],
  exports: [
    ListingTranslationModule
  ]

})
export class ListingPageModule { }
