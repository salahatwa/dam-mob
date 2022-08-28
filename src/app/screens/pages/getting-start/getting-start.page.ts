import { Component } from '@angular/core';
import { IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-getting-start',
  templateUrl: 'getting-start.page.html',
  styleUrls: ['getting-start.page.scss'],
})
export class GettingStartPage {

  constructor(
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private navCtrl: NavController) {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('back button');
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      } else {
        this.navCtrl.back();
        console.log('back');
      }
    });
  }
  logout() {
    // this.user.logout();
  }
}
