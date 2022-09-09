import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LangChangeEvent, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from '@shared/services/translate.config.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/customer/', '.json');
}


@NgModule({
  imports: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      },
      isolate: true
    }),
  ],
  exports: [
    TranslateModule
  ],
  declarations: []
})
export class CustomerTranslationModule {
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
