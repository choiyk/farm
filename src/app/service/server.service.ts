import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { User } from './../domain/User';
import { Type } from './../domain/Type';
import { APIResult } from './../domain/APIResult';
import { MyCrop } from './../domain/MyCrop';
import { Farming } from './../domain/Farming';
import { Pagination } from './../domain/Pagination';

@Injectable()
export class ServerService {
  private URL = 'http://localhost:8080/farm/api/';
  private http: Http;
  data : Object;

  constructor(http: Http) { 
    this.http = http;
  }

  //type
  getType(id : number): Promise<Type> {
    let url = this.URL + 'type/'+id;
    return this.http.get(url)
                    .toPromise()
                    .then(response =>
                      response.json() as Type[])
                    .catch(this.handleError);
  }

  //user
  getUser(id: number): Promise<User>{
    let url = this.URL + 'user/'+id;
    return this.http.get(url)
                    .toPromise()
                    .then(response=>
                      response.json() as User[])
                    .catch(this.handleError);
  }

  getUserByEmail(email : string): Promise<User> {
    let url = this.URL + 'userEmail';
    return this.http.post(url, email)
                    .toPromise()
                    .then(response =>
                      response.json() as User[])
                    .catch(this.handleError);
  }

  //mycrop
  getMyCrops(id: number): Promise<MyCrop[]>{
    let url = this.URL + 'myCrops/'+id;
    return this.http.get(url)
                    .toPromise()
                    .then(response=>response.json() as MyCrop[])
                    .catch(this.handleError);
  }
  
  saveMyCrop(myCrop : MyCrop): Promise<string> {
    let url = this.URL + 'myCrop';
    return this.http.post(url, myCrop)
                    .toPromise()
                    .then(response => response.text() as string)
                    .catch(this.handleError);
  }

  deleteMyCrop(id: number): Promise<string> {
    let url = this.URL + "myCrop/"+id;
    return this.http.delete(url)
                    .toPromise()
                    .then(response => response.text() as string)
                    .catch(this.handleError);
  }

  //farming
  getFarmingById(id: number): Promise<Farming>{
    let url = this.URL + 'farming/'+id;
    return this.http.get(url)
                    .toPromise()
                    .then(response=>response.json() as Farming)
                    .catch(this.handleError);
  }

  // getFarmingByUserAndMyCrop(userId: number, myCropId: number): Promise<Farming[]>{
  //   let url = this.URL + 'farming/'+userId+'/'+myCropId;
  //   return this.http.get(url)
  //                   .toPromise()
  //                   .then(response=>response.json() as Farming[])
  //                   .catch(this.handleError);
  // }
  getFarming(pagination: Pagination): Promise<Farming[]>{
    let url = this.URL + 'farmings';
    return this.http.post(url, pagination)
                    .toPromise()
                    .then(response=>response.json() as Farming[])
                    .catch(this.handleError);
  }

  saveFarming(farming: Farming): Promise<string>{
    let url = this.URL + 'farming';
    return this.http.post(url, farming)
                    .toPromise()
                    .then(response => response.text() as string)
                    .catch(this.handleError);
  }

  deleteFarming(id: number): Promise<string>{
    let url = this.URL + "farming/"+id;
    return this.http.delete(url)
                    .toPromise()
                    .then(response => response.text() as string)
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
} 

