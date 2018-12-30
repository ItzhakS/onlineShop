import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Configuration } from './configuration';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  getItemList():Observable<any>{
    const url = `${this.config.ApiBaseUrl}items`;
    return this.http.get(url);
  }

  getOrderList():Observable<any>{
    const url = `${this.config.ApiBaseUrl}orders`;
    return this.http.get(url);
  }

  login(user:any):Observable<any>{
    const url = `${this.config.ApiBaseUrl}login`;
    return this.http.post(url, user);
  }

  signup(user:any):Observable<any>{
    const url = `${this.config.ApiBaseUrl}signup`;
    return this.http.post(url, user);
  }

  newCart(userId):Observable<any>{
    const url = `${this.config.ApiBaseUrl}newCart/${userId}`;
    return this.http.get(url);
  }

  getUser(id):Observable<any>{
    const url = `${this.config.ApiBaseUrl}user/${id}`;
    return this.http.get(url);
  }
}
