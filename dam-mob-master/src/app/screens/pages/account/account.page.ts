import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ConfigService } from 'src/app/screens/shared/services/config.service';
import { User } from '../../core/models/user.model';
import { UserService } from '../../shared/services/auth/user.service';
import { CommonService } from '../../shared/services/common.service';
import { ToastService, ToastType } from '../../shared/services/toast.service';


import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FileService } from '@shared/services/file.service';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {


  currentUser: User;
  userForm: FormGroup;

  constructor(
    public config: ConfigService,
    public alertController: AlertController,
    public commonService: CommonService,
    private userService: UserService,
    private toastService: ToastService,
    private fileService: FileService,
    private modalController: ModalController
  ) {

  }

  ngOnInit() {

  }

  async openOptionSelection() {
    const modal = await this.modalController.create({
      component: ProfilePhotoComponent,
      cssClass: 'transparent-modal'
    });
    modal.onDidDismiss()
      .then(res => {
        console.log(res);
        if (res.role !== 'backdrop') {
          this.takePicture(res.data);
        }
      });
    return await modal.present();
  }

  async takePicture(type) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource[type]
    });


    let counter = 1;
    const blob = await fetch(image.webPath).then(r => r.blob());

    // const blob = this.dataURLtoFile(image.webPath, `file-${counter++}.jpg`);


    // const rawData = atob(image.base64String);
    // const bytes = new Array(rawData.length);
    // for (var x = 0; x < rawData.length; x++) {
    //     bytes[x] = rawData.charCodeAt(x);
    // }
    // const arr = new Uint8Array(bytes);
    // const blob = new Blob([arr], {type: 'image/png'});



    const file = new File([blob], `file-${counter++}.jpg`);

    const formData = new FormData();
    formData.append('file', file, `file-${counter++}.jpg`);


    this.commonService.showSpinner();
    this.userService.updateLogo(formData).pipe(finalize(() => {
      this.commonService.hideSpinner();
    })).subscribe((data) => {
      console.log(data);
      this.currentUser = data;
      this.initUserForm(this.currentUser);
      console.log(this.currentUser);
      this.toastService.showToast('Success', ToastType.SUCCESS);
    }, err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });

  }

  ionViewWillEnter() {
    console.log('Profile>>>');
    this.getUserDtls();
  }

  getUserDtls() {
    this.commonService.showSpinner();
    this.userService.getUserDtls().pipe(finalize(() => {
      this.commonService.hideSpinner();
    })).subscribe((data => {
      this.currentUser = data;
      this.initUserForm(this.currentUser);
      console.log(this.currentUser);
    }), err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });
  }

  initUserForm(user: User) {
    this.userForm = new FormGroup({
      companyName: new FormControl(user.companyName),
      username: new FormControl({ value: user.username, disabled: true }),
      email: new FormControl(user.email),
      address: new FormControl(user.address),
      city: new FormControl({ value: user.city, disabled: false }),
      country: new FormControl({ value: user.country, disabled: false }),
      postalCode: new FormControl({ value: user.postalCode, disabled: false }),
      phone: new FormControl({ value: user.phone, disabled: false }),
      productRiskCategory: new FormControl({ value: user.productRiskCategory, disabled: false }),
      qr: new FormControl({ value: user.qr, disabled: false }),
    })
  }

  onSubmit() {
    console.log(this.userForm.value);

    this.commonService.showSpinner();
    this.userService.update(this.userForm.value).pipe(finalize(() => {
      this.commonService.hideSpinner();
    })).subscribe((data) => {

      this.toastService.showToast('Success', ToastType.SUCCESS);
    },
      err => {
        this.toastService.showToast(err.message, ToastType.DANGER);
      });
  }



  selectPhoto() {
    this.fileService.selectPhoto();
  }

  async confirmClear() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure want to clear all data?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Clear',
          handler: () => {
            // this.cashService.clearAll();
          }
        }
      ]
    });
    await alert.present();
  }

  onLogout() {
    // this.user.logout();
  }

}
