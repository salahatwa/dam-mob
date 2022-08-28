import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private apiService: ApiService) { }

  getAllCustomers(): Observable<any> {
    return this.apiService.get('/customer/all').pipe(map(data => {
      return data;
    }));
  }

  getCustomers(params: any): Observable<any> {
    return this.apiService.get('/customer', params).pipe(map(data => {
      return data;
    }));
  }

  getCustomer(id: any): Observable<any> {
    return this.apiService.get('/customer/details/' + id).pipe(map(data => {
      return data;
    }));
  }

  insertCustomer(customer: Customer): Observable<Customer> {
    return this.apiService.post('/customer', customer).pipe(map(data => {
      return data;
    }));
  }

  updateCustomer(customer: Customer) {
    return this.apiService.put('/customer', customer).pipe(map(data => {
      return data;
    }));
  }

  deleteCustomer(id) {
    return this.apiService.delete('/customer/' + id).pipe(map(data => {
      return data;
    }));
  }
}
