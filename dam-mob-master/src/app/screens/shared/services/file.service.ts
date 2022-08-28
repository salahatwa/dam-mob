import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform } from '@ionic/angular';

import { finalize } from 'rxjs/operators';
import { UserService } from './auth/user.service';
import { CommonService } from './common.service';
import { ToastService, ToastType } from './toast.service';

import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  static readonly isApp = Capacitor.getPlatform() !== 'web';

  isLoading = false;
  loader: HTMLIonLoadingElement;

  // private fileOpener: FileOpener
  constructor(
    private platform: Platform, private toastService: ToastService, public commonService: CommonService,
    private userService: UserService,
  ) { }


  static async writeAndOpenFile(data: Blob, fileName: string) {
    if (FileService.isApp) {
      var reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = async function () {
        var base64data = reader.result;
        try {
          const result = await Filesystem.writeFile({
            path: fileName,
            data: <string>base64data,
            directory: Directory.Data,
            recursive: true
          });
          let fileOpener: FileOpener = new FileOpener();
          fileOpener.open(result.uri, data.type)
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));

          console.log('Wrote file', result.uri);
        } catch (e) {
          console.error('Unable to write file', e);
        }
      }
    } else {
      // let blob = new Blob([data], { type: type });
      let url = window.URL.createObjectURL(data);
      let pwa = window.open(url); if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert('Please disable your Pop-up blocker and try again.');
      }
    }
  }

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
