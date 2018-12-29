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
  getCartItems(cartId:number):Observable<any>{
    const url = `${this.config.ApiBaseUrl}/cart/${cartId}`;
    return this.http.get(url);
  }

  postCartItem(item:any):Observable<any>{
    const url = `${this.config.ApiBaseUrl}addCartItem`;
    return this.http.post(url, item);
  }

  deleteCartItem(id:number):Observable<any>{
    const url = `${this.config.ApiBaseUrl}deleteCartItem/${id}`;
    return this.http.delete(url);
  }

  removeAllCartItems(cartId:number){
    const url = `${this.config.ApiBaseUrl}removeCartItems/${cartId}`;
    return this.http.delete(url);
  }

  search(str:string):Observable<any>{
    const url = `${this.config.ApiBaseUrl}search/${str}`;
    return this.http.get(url);
  }

  shipOrder(order:any, cartId:number, total:number):Observable<any>{

    const model = {
      cartId: cartId,
      total:total,
      city: order.city,
      street: order.street,
      orderDate: new Date(),
      sendDate: order.sendDate,
      cardNum: order.ccNumber,
    }
    const url = `${this.config.ApiBaseUrl}shipOrder`;
    return this.http.post(url, model);
  }
}
