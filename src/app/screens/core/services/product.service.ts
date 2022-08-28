import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private messageSource: BehaviorSubject<Product> = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  productList: Product[];
  selectedProduct: Product = new Product();
  public valueBtn: string;
  public status: number = 1;

  constructor(private apiService: ApiService) { }

  getAllProducts(): Observable<any> {
    return this.apiService.get('/product/all').pipe(map(data => {
      return data;
    }));
  }

  getProducts(params: any): Observable<any> {
    // return this.productList = this.firebase.list('products');
    console.log(params);
    return this.apiService.get('/product', params).pipe(map(data => {
      return data;
    }));
  }

  getProduct(id: any): Observable<any> {
    return this.apiService.get('/product/details/' + id).pipe(map(data => {
      return data;
    }));
  }

  getValueBtn(val) {
    if (val == 1) {
      this.status = 1;
      return this.valueBtn = 'حفظ';
    }
    else {
      this.status = 2;
      return this.valueBtn = 'تعديل';
    }
  }

  insertProduct(product: Product): Observable<Product> {
    return this.apiService.post('/product', product).pipe(map(data => {
      data.action = 'Add';
      this.messageSource.next(data);
      return data;
    }));
  }

  updateProduct(product: Product) {
    return this.apiService.put('/product', product).pipe(map(data => {
      data.action = 'Update';
      data.index = product.index;
      this.messageSource.next(data);
      return data;
    }));
  }

  deleteProduct(product: Product) {
    return this.apiService.delete('/product/' + product.id).pipe(map(data => {
      product.action = 'Delete';
      this.messageSource.next(product);
      return data;
    }));
  }
}
