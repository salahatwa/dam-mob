import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../storage.service';


@Injectable({
  providedIn: 'root'
})
export class JwtService {
  static TOKEN_KEY: string = 'jwtToken';

  constructor(private storage: StorageService,
  ) {
    this.storage.init();
  }

  async init(){
    await this.storage.init();
  }

  getToken(): Promise<any> {
    return this.storage.get(JwtService.TOKEN_KEY);
  }

  saveToken(token: string) {
    this.storage.set(JwtService.TOKEN_KEY, token);
  }

  destroyToken() {
    // this.storage.deleteItem(JwtService.TOKEN_KEY);
  }

}
