import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

export enum ToastType {
  SUCCESS = 0,
  INFO = 1,
  WARNING = 2,
  DANGER = 3
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController,
  ) { }


  async showToast(msg: string, type: ToastType, duration: number = 3000, needDismiss: boolean = false) {

    let cssClass = 'alert';
    let icon = '';

    switch (type) {
      case ToastType.SUCCESS:
        cssClass = 'alert alert-success';
        icon = 'checkmark-circle-outline';
        break;
      case ToastType.INFO:
        cssClass = 'alert alert-info';
        icon = 'information-circle';
        break;
      case ToastType.WARNING:
        cssClass = 'alert alert-warning';
        icon = 'warning';
        break;
      case ToastType.DANGER:
        cssClass = 'alert alert-danger';
        icon = 'close-circle';
        break;

      default:
        break;
    }

    const options: ToastOptions = {
      header: 'Welcome!',
      message: "<ion-icon name=" + icon + "></ion-icon>  " + msg,
      cssClass: cssClass,
      position: 'top',
      duration
    };
    if (needDismiss) {
      options.buttons = [
        {
          text: 'Dismiss',
          role: 'cancel',
        }
      ];
    }
    const toast = await this.toastController.create(options);
    toast.present();
  }


}
