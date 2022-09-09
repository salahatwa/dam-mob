import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '@core/models/product';
import { ProductService } from '@core/services/product.service';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from '@shared/services/common.service';
import { ToastService, ToastType } from '@shared/services/toast.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-operations',
  templateUrl: './product-operations.component.html',
  styleUrls: ['./product-operations.component.scss'],
})
export class ProductOperationsComponent implements OnInit {


  product: Product;
  productForm: FormGroup;
  constructor(private translateService: TranslateService, private toastService: ToastService, private fb: FormBuilder, private toastCtrl: ToastController, private activatedRoute: ActivatedRoute, private common: CommonService, public productService: ProductService) {
    this.initForm({});
  }

  ngOnInit() {

    // this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          const id = params['id'];
          if (id.toUpperCase() != 'NEW')
            this.getItemDetails(id);

        }
      );



  }


  initForm(product: Product) {
    this.productForm = this.fb.group({
      'id': [product?.id],
      'name': [product?.name, [Validators.required]],
      'location': [product?.location, [Validators.required, Validators.pattern('[0-9a-zA-Z\s\u0600-\u06FF]*')]],
      'price': [product?.price, [Validators.required]],
      'quantity': [product?.quantity, [Validators.required]],
      'code': [product?.code, []]
    });
  }


  get f() {
    return this.productForm.controls;
  }



  onSubmit() {
    this.common.showSpinner();

    let product = this.productForm.value;

    console.log(product);

    if (product.id == null)
      this.productService.insertProduct(product).pipe(finalize(() => {
        this.common.hideSpinner();
      })).subscribe(data => {
        this.toastService.showToast(this.translateService.instant('msg.success.add'), ToastType.SUCCESS);
      }, err => {
        this.toastService.showToast(err.message, ToastType.DANGER);
      });

    else {
      this.productService.updateProduct(product).pipe(finalize(() => {
        this.common.hideSpinner();
      })).subscribe(data => {
        this.toastService.showToast(this.translateService.instant('msg.success.update'), ToastType.SUCCESS);

      }, err => {
        this.toastService.showToast(err.message, ToastType.DANGER);
      });
    }

  }


  getItemDetails(id) {
    this.common.showSpinner();
    this.productService.getProduct(id).pipe(finalize(() => {
      this.common.hideSpinner();
    })).subscribe(item => {
      this.product = item;
      this.initForm(item);
    }, err => {
      this.toastService.showToast(err.message, ToastType.DANGER);
    });
  }



}
