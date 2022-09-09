import { Component } from '@angular/core';
import { IInvoiceFilter } from '@core/models/invoice';
import { DataService } from '@core/services/data.service';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invoice-filter-result',
  templateUrl: './invoice-filter-result.component.html',
  styleUrls: ['./invoice-filter-result.component.scss'],
})
export class InvoiceFilterResultComponent {


  filter: IInvoiceFilter;
  subscription: Subscription;

  constructor(private data: DataService, public navCtrl: NavController) { }

  ionViewDidEnter() {
    this.subscription = this.data.currentMessage.subscribe(item => {
      this.filter = item?.data;
      console.log(this.filter);
    });
  }



  ionViewDidLeave() {
    this.subscription.unsubscribe();
  }


  backToSearch() {
    this.navCtrl.navigateForward('invoice-filter', { animated: true });
  }


}
