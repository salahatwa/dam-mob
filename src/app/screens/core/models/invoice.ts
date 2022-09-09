import { Customer } from './customer';
import { Product } from './product';

export class IInvoice {
  id?: string;
  createdAt?: string;
  paidAt?: Date;
  invoiceNumber?: number;
  status?: InvoiceStatus = InvoiceStatus.NEW;
  uid?: string;
  type?: ServiceType = ServiceType.INVOICE;
  customer: Customer;
  items: ItemInvoice[];
  totalPrice?: number;
  paidAmt?: number;
  totalyPaid?: boolean;

  expanded?: boolean;
}

export class IInvoiceFilter {
  id?: string;
  customer?: Customer=null;
  statusList?: []=[];
  state?: string;
  fromDate?: Date;
  toDate?: Date;
}

export interface ItemInvoice {
  id?: number;
  product: Product;
  quantity: number;
  discount: number;
  bonus: number;
  totalAfterDiscount?: number;
  returns?: number;


  expanded?: boolean;
}

export interface InvoiceStatusUpdate {
  id?: string;
  paidDate?: string;
  paidAmt?: number;
  returnsDate?: Date;
  status?: InvoiceStatus;
  cancel?: boolean;
  items?: ItemInvoice[];
}


export enum InvoiceStatus {
  NEW = 0,
  PAID = 1,
  RETURNS = 2,
  CANCELED = 3,
  PAID_PARTIALLY = 4,
  SAMPLE = 5
}


export enum ServiceType {
  INVOICE = 0,
  SAMPLE = 1
}