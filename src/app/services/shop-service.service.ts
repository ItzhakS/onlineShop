import { Injectable } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {

  constructor(
    private http: HttpClient,
    private config: Configuration
  ) { }

  getItems(catId:number):Observable<any>{
    const url = `${this.config.ApiBaseUrl}item/${catId}`;
    return this.http.get(url);
  }
}
