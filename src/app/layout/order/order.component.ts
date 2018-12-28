import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { ActivatedRoute } from '@angular/router';
import { Configuration } from 'src/app/services/configuration';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  shippingForm = this.fb.group({
    city:['', Validators.required],
    street: ['', Validators.required],
    shippingDate:['', Validators.required],
    ccNumber:['', Validators.required, Validators.minLength(4)],
    sendDate:['', Validators.required]
  })
  cartItemList: any[];
  cartTotal: number;
  cityList: string[];


  constructor(
    private fb: FormBuilder,
    private shopService:ShopServiceService,
    private route : ActivatedRoute,
    private config: Configuration
  ) { 
    this.cityList = this.config.CityList
  }

  getCartItems(cartId:number){
    this.shopService.getCartItems(cartId)
      .subscribe(
        res=>{
          this.cartItemList = res;
          let totalArr= new Array();
          this.cartItemList.forEach(item=>totalArr.push(item.total))
          this.cartTotal = totalArr.reduce((a,b)=>a+b,0);
        }
          )
  }

  onSubmit(){
 console.log(this.shippingForm.status)
  }

  ngOnInit() {
    this.getCartItems(1);
    // this.route.parent.data.subscribe(r => {

    // })
  }

}
