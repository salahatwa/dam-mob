import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { SplashScreen } from '@capacitor/splash-screen';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '@shared/services/storage.service';
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
    private translate: TranslateService,
    private storage: StorageService) {
    //  this.router.navigate(['/home'], { replaceUrl: true });
    // translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    this.languageChanged();




  }

  switchLang(lang: string) {
    this.translate.use(lang);
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
    console.log('>>>>>>>>>>>>1');
    // this.router.navigate(['/getting-start'], { replaceUrl: true });
    await this.storage.init();
    let token = await this.jwtService.getToken();

    console.log('>>>>>>>>>>>>2' + token);
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
