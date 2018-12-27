import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { ActivatedRoute } from '@angular/router';

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
    ccNumber:['', Validators.required]
  })
  cartItemList: object[];

  constructor(
    private fb: FormBuilder,
    private shopService:ShopServiceService,
    private route : ActivatedRoute
  ) { }

  getCartItems(cartId:number){
    this.shopService.getCartItems(cartId)
      .subscribe(
        res=> this.cartItemList = res
      )
  }

  ngOnInit() {
    this.getCartItems(1);
    // this.route.parent.data.subscribe(r => {

    // })
  }

}
