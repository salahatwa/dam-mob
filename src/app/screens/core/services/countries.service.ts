import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requestable } from './github/requestable';

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends Requestable {


  constructor(private httpClient: HttpClient, private handler: HttpBackend) {
    super('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');
    this.httpClient = new HttpClient(handler);
  }

  init() {
    //     /**
    // * We are going to authenticate with Github and
    // * specify our repo name and file we just created.
    // */
    //     var options = {
    //       // host: 'private-github-api.com', // <-- Private github api url. If not passed, defaults to 'api.github.com'
    //       // pathPrefix: 'prefix-for-enterprise-instance', // <-- Private github api url prefix. If not passed, defaults to null.
    //       protocol: 'https', // <-- http protocol 'https' or 'http'. If not passed, defaults to 'https'
    //       owner: 'salahatwa', // <-- Your Github username
    //       repo: 'countries-states-cities-db', // <-- Your repository to be used a db
    //       path: 'countries+states+cities.json.json' // <- File with extension .json
    //     };

    //     // Initialize it with the options from above.
    //     var githubDB = new GithubDB(options);

    //     // Authenticate Github DB -> grab a token from here https://github.com/settings/tokens
    //     let personalAccessToken = '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';
    //     githubDB.auth(personalAccessToken);

    //     // Connect to repository
    //     githubDB.connectToRepo();

    //     // You are now authenticated with Github and you are ready to use it as your database.
    //     githubDB.save({ "message": "wooohoo" });

    //     githubDB.find({ name: "Egypt" }).then((results) => {
    //       console.log(results);
    //     });
  }




  getRepo(): Observable<any> {
    // https://api.github.com/repos/OWNER/REPO/contents/PATH
    const options = { headers: this.__getRequestHeaders() };
    console.log(options);
    return this.httpClient.get(this.__getURL('/repos/salahatwa/countries-db/contents/eg.json'), options);
  }



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
