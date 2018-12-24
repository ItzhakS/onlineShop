import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from 'src/app/services/shop-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItemlist = []

  constructor(
    private shopService: ShopServiceService
  ) { }

  ngOnInit() {
    this.shopService.getCartItems(1)
      .subscribe(
        res=>this.cartItemlist = res,
        e=>this.cartItemlist = []
      )
  }

}
