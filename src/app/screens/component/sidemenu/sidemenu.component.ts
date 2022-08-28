import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/screens/shared/services/config.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit {

  constructor(
    public config: ConfigService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
  }

  logout() {
    // this.user.logout();
  }

}
