import { Component, OnInit } from '@angular/core';
import { User } from '@core/models/user.model';
import { AlertController, MenuController } from '@ionic/angular';
import { UserService } from '@shared/services/auth/user.service';
import { CommonService } from '@shared/services/common.service';
import { ToastService, ToastType } from '@shared/services/toast.service';
import { finalize } from 'rxjs/operators';
import { ConfigService } from 'src/app/screens/shared/services/config.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {
  currentUser: User;
  dark: boolean = false;
  constructor(
    public userService: UserService,
    public config: ConfigService,
    public alertController: AlertController,
    public commonService: CommonService,
    private toastService: ToastService,
    private menu: MenuController
  ) { }

  ngOnInit() {
    console.log('Profile>>>');
    this.getUserDtls();
  }

  ionViewDidEnter() {
   
  }


  ionViewWillEnter() {
   
  }

  getUserDtls() {
    // this.commonService.showSpinner();
    this.userService.getUserDtls().pipe(finalize(() => {
      // this.commonService.hideSpinner();
    })).subscribe((data => {
      this.currentUser = data;

      console.log(this.currentUser);
    }), err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });
  }

  logout() {
    this.userService.logout();
    this.close();
  }


  close() {
    this.menu.close('start');
    // this.menu.close('start');
  }

}
