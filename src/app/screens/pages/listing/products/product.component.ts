import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@core/models/product';
import { ProductService } from '@core/services/product.service';
import { CommonService } from '@shared/services/common.service';
import { UtilsService } from '@shared/services/utils.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  page_number = 1;
  products: Product[] = [];

  constructor(private productService: ProductService, private common: CommonService, private router: Router, private utilsService: UtilsService) { }

  goToDetailPage(id: number) {
    console.log(id);
    this.router.navigate(['product-details', id]);
  }

  ngOnInit() {
    this.getItems(false, "");
  }



  getItems(isFirstLoad, event) {
    this.common.showSpinner();
    this.productService.getProducts(this.utilsService.getRequestParams(this.page_number, 5, 'createdAt')).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(item => {
      let items = item?.content;

      for (let i = 0; i < items.length; i++) {
        this.products.push(items[i]);
      }
      if (isFirstLoad)
        event.target.complete();

      this.page_number++;
    });
  }


}
