import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountriesService } from '@core/services/countries.service';
// import { SplashScreen } from '@capacitor/splash-screen';
import { MenuController } from '@ionic/angular';
import { StorageService } from '@shared/services/storage.service';
import { TranslateConfigService } from '@shared/services/translate.config.service';
import { JwtService } from './screens/shared/services/auth/jwt.service';
import { ConfigService } from './screens/shared/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private jwtService: JwtService,
    private router: Router,
    private menu: MenuController,
    private config: ConfigService,
    private translateConfigService: TranslateConfigService,
    private storage: StorageService, private countryService: CountriesService) {


  
    // this.translateConfigService.setLanguage('ar');

    this.translateConfigService.initDefaultLanguage();


    this.languageChanged();


    // this.countryService.getRepo().subscribe((data) => {
    //   console.log();

    //   console.log(this.countryService.findAllInObject(JSON.parse(atob(data?.content))?.states, { "name": "Monufia" }, true));

    // });




  }

  switchLang(lang: string) {
    // await this.translateConfigService.setLanguage('ar');
    this.translateConfigService.setLanguage(lang);
  }

  languageChanged() {
    // localStorage.setItem('LANG', this.lang);
    // this.translate.setDefaultLang(this.lang);
    // if (this.lang === 'iw')

    this.document.documentElement.dir = 'rtl';
    // else
    // this.document.documentElement.dir = 'ltr';
  }

  async ngOnInit() {
    console.log('>>>>>>>>>>>>4');
    // this.router.navigate(['/getting-start'], { replaceUrl: true });
    await this.storage.init();
    let token = await this.jwtService.getToken();

    console.log('>>>>>>>>>>>>5' + token);
    if (token) {
      console.log(token);
      this.router.navigate(['/home/listing'], { replaceUrl: true });
      this.menu.enable(true, 'main');
      // SplashScreen.hide();
    } else {
      console.log('>>>>>>>>>>>>2');
      this.router.navigate(['/getting-start'], { replaceUrl: true });
      this.menu.enable(true, 'main');
      // SplashScreen.hide();
    }

    // from(this.jwtService.getToken())
    //   .pipe(
    //     switchMap(token => {
    //       if (token) {
    //         console.log(token);
    //         this.router.navigate(['/home/listing'], { replaceUrl: true });
    //         this.menu.enable(true, 'main');
    //         SplashScreen.hide();
    //       }

    //       else {
    //         console.log('>>>>>>>>>>>>2');
    //         this.router.navigate(['/getting-start'], { replaceUrl: true });
    //         this.menu.enable(false, 'main');
    //         SplashScreen.hide();
    //       }
    //       return of();
    //     })
    //   );
  }

  ionViewDidEnter() {
    // this.translate.use('ar');

    // from(this.jwtService.getToken())
    //   .pipe(
    //     switchMap(token => {
    //       if (token) {
    //         console.log(token);
    //         this.router.navigate(['/home/listing'], { replaceUrl: true });
    //         this.menu.enable(true, 'main');
    //         SplashScreen.hide();
    //       }

    //       else {
    //         console.log('>>>>>>>>>>>>');
    //         this.router.navigate(['/getting-start'], { replaceUrl: true });
    //         this.menu.enable(false, 'main');
    //         SplashScreen.hide();
    //       }
    //       return of();
    //     })
    //   );

  }
}
