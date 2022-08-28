import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.scss'],
})
export class ProfilePhotoComponent implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }
  ngOnInit() { }
  closeModal() {
    this.modalController.dismiss(null, 'backdrop');
  }
  startCapture(type) {
    this.modalController.dismiss(type, 'select');
  }


}
