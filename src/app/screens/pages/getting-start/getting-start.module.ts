import { NgModule } from '@angular/core';
import { GettingStartPage } from './getting-start.page';

import { SharedModule } from '../../shared/component/shared.module';
import { GettingStartPageRoutingModule } from './getting-start-routing.module';
import { LangChangeEvent, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from '@shared/services/translate.config.service';


@NgModule({
  imports: [
    SharedModule,
    TranslateModule,
    GettingStartPageRoutingModule
  ],
  declarations: [GettingStartPage]
})
export class GettingStartPageModule { 
  constructor(public translationService: TranslateService, private tr: TranslateConfigService) {
    this.tr.getCurrentLang().then((currentLang) => {
      this.translationService.currentLang = currentLang;
      this.translationService.setDefaultLang(currentLang);
      this.translationService.use(currentLang);
    });

    this.translationService.store.onLangChange.subscribe(
      (lang: LangChangeEvent) => {
        this.translationService.setDefaultLang(lang.lang);
        this.translationService.use(lang.lang);
      }
    );
  }
}
