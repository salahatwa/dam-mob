import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IInvoice, InvoiceStatusUpdate } from '../models/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoiceList: [];
  selectedInvoice: IInvoice = new IInvoice();

  constructor(private apiService: ApiService) {
  }

  getInvoices(params: any): Observable<any> {
    return this.apiService.get('/invoice', params).pipe(map(data => {
      this.invoiceList = data;
      return data;
    }));
  }

  getInvoice(id: any): Observable<any> {
    return this.apiService.get('/invoice/details/' + id).pipe(map(data => {
      return data;
    }));
  }

  updateInvoiceStatus(rq: InvoiceStatusUpdate): Observable<any> {
    return this.apiService.post('/invoice/update-status', rq).pipe(map(data => {
      this.invoiceList = data;
      return data;
    }));
  }

  filterInvoices(filter: any, params: any): Observable<any> {
    return this.apiService.post('/invoice/filter', filter, params).pipe(map(data => {
      this.invoiceList = data;
      return data;
    }));
  }

  insertInvoice(invoice: IInvoice): Observable<IInvoice> {
    console.log(invoice);
    return this.apiService.post('/invoice', invoice).pipe(map(data => {
      return data;
    }));
  }

  updateInvoice(invoice: IInvoice) {
    return this.apiService.put('/invoice', invoice).pipe(map(data => {
      return data;
    }));
  }

  deleteInvoice(id: string) {
    return this.apiService.delete('/invoice/' + id).pipe(map(data => {
      return data;
    }));
  }

  downloadInvoice(id: string) {
    return this.apiService.getGetFile('/invoice/download/' + id).pipe(map(data => {
      return data;
    }));
  }

  downloadTaxbill(id: string) {
    return this.apiService.getGetFile('/invoice/download/taxbill/' + id).pipe(map(data => {
      return data;
    }));
  }


  downloadStatment(filter: any) {
    return this.apiService.postGetFile('/invoice/download/statment', filter).pipe(map(data => {
      return data;
    }));
  }


  money(value: number) {
    return value.toLocaleString('ar', { style: 'currency', currency: 'EGB', minimumFractionDigits: 2 });
  }


  openInvoiceDialog(invoice: IInvoice) {
    // const dialogRef = this.modalService.open(ReportViewerDialogComponent, { size: 'xl' });
    // dialogRef.componentInstance.invoice = invoice;
    // dialogRef.result.then(result => {

    //   if (result) {


    //   }
    // }).catch((res) => {

    // });
  }
}
