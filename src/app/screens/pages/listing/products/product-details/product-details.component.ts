import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Product } from 'src/app/screens/core/models/product';
import { ProductService } from 'src/app/screens/core/services/product.service';
import { ToastService } from 'src/app/screens/shared/services/toast.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  id: number;
  product: Product;
  constructor(private activatedRoute: ActivatedRoute, private common: CommonService, private productService: ProductService, private toastService: ToastService) {


    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  }

  ngOnInit() {
    this.getItemDetails();
  }


  getItemDetails() {
    this.common.showSpinner();
    this.productService.getProduct(this.id).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(item => {
      this.product = item;
    }, err => {

    });
  }


}
