import { Injectable } from '@angular/core';
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

  async init() {
    await this.storage.init();
  }

  async getToken(): Promise<any> {
    if (this.storage)
      await this.storage.init();

    return this.storage.get(JwtService.TOKEN_KEY);
  }

  saveToken(token: string) {
    this.storage.set(JwtService.TOKEN_KEY, token);
  }

  destroyToken() {
    this.storage.remove(JwtService.TOKEN_KEY);
  }

}
