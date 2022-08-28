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

  photo = 'https://i.pravatar.cc/150';

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
    this.photo = image.webPath;
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


  selectedFile: File;
  retrievedImage: any;
  isUploading = false;
  isUploaded = false;
  fileName: string = '';

  uploadFile(event) {


    // The File object
    const file = event.target.files[0];
    console.log(file.size);
    console.log(file);

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    this.isUploading = true;
    this.isUploaded = false;


    this.fileName = file.name;

    this.commonService.showSpinner();
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('file', file, this.fileName);
    //Make a call to the Spring Boot Application to save the image
    this.userService.updateLogo(uploadImageData).pipe(finalize(() => {
      this.commonService.hideSpinner();
    })).subscribe((data) => {
      this.toastService.showToast('Success', ToastType.SUCCESS);
      console.log(data);
    }, err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });


  }


  public onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }
  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    this.commonService.showSpinner();
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('file', this.selectedFile, this.selectedFile.name);
    //Make a call to the Spring Boot Application to save the image
    this.userService.updateLogo(uploadImageData).pipe(finalize(() => {
      this.commonService.hideSpinner();
    })).subscribe((data) => {
      this.toastService.showToast('Success', ToastType.SUCCESS);
      console.log(data);
    }, err => {
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
