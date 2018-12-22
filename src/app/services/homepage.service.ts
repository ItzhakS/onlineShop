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

}
