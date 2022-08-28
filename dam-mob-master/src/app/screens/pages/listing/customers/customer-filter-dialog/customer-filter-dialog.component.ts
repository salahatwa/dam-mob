import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-customer-filter-dialog',
  templateUrl: './customer-filter-dialog.component.html',
  styleUrls: ['./customer-filter-dialog.component.scss'],
})
export class CustomerFilterDialogComponent {

  name: string;

  constructor(private modalCtrl: ModalController) { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    console.log(this.name);
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
