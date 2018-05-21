import CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './../domain/User';
import { APIResult } from './../domain/APIResult';

@Injectable()
export class AuthService {
    private URL = 'http://localhost:8080/farm/api/';
    // private URL = 'http://172.30.24.195:8080/farm/api/';
    private http: Http;
    data : Object;
  
    constructor(http: Http) { 
      this.http = http;
    }

    public encryption(name: string): string {
        let hash = CryptoJS.SHA256(name).toString(CryptoJS.enc.Hex);
        return hash;
    };

    public login(user : User) : Promise<APIResult> {
        let url = this.URL + 'login';
        user.pw = this.encryption(user.pw);
        return this.http.post(url, user)
                  .toPromise()
                  .then(response => response.json() as APIResult)
                  .catch(this.handleError);
    }

    public saveUser(user : User): Promise<APIResult> {
        let url = this.URL + 'user';
        user.pw = this.encryption(user.pw);
        return this.http.post(url, user)
                  .toPromise()
                  .then(response => response.json() as APIResult)
                  .catch(this.handleError);
      }
    
      private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
}