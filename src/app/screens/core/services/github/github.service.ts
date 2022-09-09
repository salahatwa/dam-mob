import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {


  constructor(private http: HttpClient) { }



  // getCounts(): Observable<Analyis> {
  //   return this.apiService.get('/analyis/counts').pipe(map(data => {
  //     return data;
  //   }));
  // }

  // getCustomers(params: any): Observable<any> {
  //   return this.apiService.get('/customer', params).pipe(map(data => {
  //     return data;
  //   }));
  // }

  // insertCustomer(customer: Customer): Observable<Customer> {
  //   return this.apiService.post('/customer', customer).pipe(map(data => {
  //     data.action = 'Add';
  //     this.messageSource.next(data);
  //     return data;
  //   }));
  // }

  // updateCustomer(customer: Customer) {
  //   return this.apiService.put('/customer', customer).pipe(map(data => {
  //     customer.action = 'Update';
  //     this.messageSource.next(customer);
  //     return data;
  //   }));
  // }

  // deleteCustomer(customer: Customer) {
  //   return this.apiService.delete('/customer/' + customer?.id).pipe(map(data => {
  //     customer.action = 'Delete';
  //     this.messageSource.next(customer);
  //     return data;
  //   }));
  // }
}
