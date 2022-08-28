import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  item: Item = {};

  private messageSource = new BehaviorSubject(this.item);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  shareData(message: Item) {
    this.messageSource.next(message)
  }

}
