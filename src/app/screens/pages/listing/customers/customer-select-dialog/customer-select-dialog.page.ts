import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '@core/models/customer';
import { ModalController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'customer-select-dialog',
  templateUrl: './customer-select-dialog.page.html',
  styleUrls: ['./customer-select-dialog.page.scss'],
})
export class CustomerSelectDialogComponent implements OnInit {


  @Input() title: string;
  @Input() customers: Customer[];
  queryText: string;
  results: Customer[] = [];

  ngOnInit() {
    this.results = this.customers;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.results = this.customers;
  }

  filter() {
    console.log(this.queryText);
    this.results = this.customers;
    this.results = this.results.filter((item) => {
      return ((item.name.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1) ||
        (item.state.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1));
    })
  }


  select(customer) {
    this.modalCtrl.dismiss(customer);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}

