import { Component, OnInit } from '@angular/core';
import { UserService } from '@shared/services/auth/user.service';
import { ConfigService } from 'src/app/screens/shared/services/config.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {

  constructor(
    public userService: UserService,
    public config: ConfigService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
  }

  logout() {
    this.userService.logout();
  }

}
