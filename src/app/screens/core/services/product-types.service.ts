import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../../shared/classes/config';

@Injectable({
  providedIn: 'root'
})
export class ProductTypesService {
  private _productTypesUrl = `${new Config().api}/products/types`;
  // private _headers = this._utils.makeHeaders({ withToken: true });

  constructor(
    private _http: HttpClient,
  ) { }

  get(): Observable<any[]> {
    this.beforeRequest();

    return;
  }

  beforeRequest(): void {
    // this._progress.start();
  }

  afterRequest(data: any): void {
    // this._progress.done();
  }

}
