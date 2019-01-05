import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Configuration } from 'src/app/services/configuration';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { modalConfigDefaults } from 'angular-bootstrap-md/angular-bootstrap-md/modals/modal.options';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  cart: any;

  get user():any{return this.config.user}

  shippingForm = this.fb.group({
    city:[this.user.city, Validators.required],
    street: [this.user.street, Validators.required],
    ccNumber:['', [Validators.required, Validators.minLength(4)]],
    sendDate:['', Validators.required]
  })
  cartItemList: any[];
  cartTotal: number;
  cityList: string[];
  cartId:number;
  modalRef: MDBModalRef;
  @ViewChild('basicModal') modal;


  constructor(
    private fb: FormBuilder,
    private shopService:ShopServiceService,
    private router: Router,
    private config: Configuration,
    private modalService: MDBModalService
  ) { 
    this.cityList = this.config.CityList;
    console.log(this.user)
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
    this.shopService.shipOrder(this.shippingForm.value,this.cartId,this.cartTotal)
    .subscribe(res=>{
      console.log(res)
      this.shippingForm.reset();
      this.modal.show();
    })
  }

  backToHome(){
    localStorage.removeItem('cart');
    this.router.navigate(['../home']);
  }

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.cartId = this.cart.id;
    this.getCartItems(this.cartId);

  }

}
