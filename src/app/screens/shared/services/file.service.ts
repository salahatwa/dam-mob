import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { ToastService, ToastType } from './toast.service';
import { finalize } from 'rxjs/operators';
import { CommonService } from './common.service';
import { UserService } from './auth/user.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  isLoading = false;
  loader: HTMLIonLoadingElement;

  // private fileOpener: FileOpener
  constructor(
    private platform: Platform, private toastService: ToastService, public commonService: CommonService,
    private userService: UserService,
  ) { }

  openBlobFile(data: any, type: string, filename: string) {
    let blob = new Blob([data], { type: type });


    // const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
    // console.log(writeDirectory);
    // this.file.writeFile(writeDirectory, filename, blob, { replace: true })
    //   .then(() => {
    //     this.fileOpener.open(writeDirectory + filename, type)
    //       .catch(() => {
    //         console.log('Error opening pdf file');
    //       });
    //   })
    //   .catch(() => {
    //     console.error('Error writing pdf file');
    //     this.toastService.showToast('Error writing pdf file', ToastType.DANGER);
    //   });
  }

  async selectPhoto(): Promise<void> {
    let counter = 0;
    const ab = await this.getPhoto(CameraSource.Photos);
    if (ab) {

      // await this.uploadAll(ab);
      const blob = await fetch(ab).then(r => r.blob());
      const formData = new FormData();
      formData.append('file', blob, `file-${counter++}.jpg`);

      this.userService.updateLogo(formData).pipe(finalize(() => {
        this.commonService.hideSpinner();
      })).subscribe((data) => {
        this.toastService.showToast('Success', ToastType.SUCCESS);
        console.log(data);
      }, err => {
        this.toastService.showToast(err.message, ToastType.DANGER);
      });
  

    }
  }

  private async getPhoto(source: CameraSource): Promise<string | undefined> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source
    });

    // if (image.webPath) {
    //   this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
    // }
    return image.webPath;
  }
}
