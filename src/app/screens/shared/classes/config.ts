import { environment } from "src/environments/environment";


export class Config {
  api: string = environment.api;
  unauth_api:string=environment.unauth_api;
}
