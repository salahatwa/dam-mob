import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('ar');
    // this.translateService.use('ar');
    this.platform.backButton.subscribeWithPriority(11, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  ngOnInit() {
  }
}
