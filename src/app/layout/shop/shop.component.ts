import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ItemModalComponent } from './item-modal/item-modal.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  cartCollapsed = false;
  cartItemList = [];
  cartTotal: number = 0;
  itemsList: object[]= [];
  dairyActive: boolean = false;
  meatActive: boolean = false;
  carbsActive: boolean = false;
  miscActive: boolean = false;
  modalRef: MDBModalRef;
  cartId: number=1;

  constructor(
    private shopService: ShopServiceService,
    private modalService: MDBModalService
  ) { }

  ngOnInit() {
    this.loadItems(1);

    this.shopService.getCartItems(1)
      .subscribe(
        res=>{
          this.cartItemList = res;
          if(this.cartItemList.length>0){
            let totalArr= new Array();
            this.cartItemList.forEach(item=>totalArr.push(item.total))
            this.cartTotal = totalArr.reduce((a,b)=>a+b,0);
          }
        },
        e=>{
          this.cartTotal = 0;
          this.cartItemList = []
        })
  }

  openModal(item) {
    this.modalRef = this.modalService.show(ItemModalComponent)
    this.modalRef.content.name = item.name;
    this.modalRef.content.price = item.price;
    this.modalRef.content.id = item.id;
    this.modalRef.content.cartId = this.cartId ;

    this.modalRef.content.action.subscribe(
      res=>{
        this.cartItemList.push(res)
        this.cartTotal += res.total
      } 
    )
  }

  loadItems(catId){
    this.shopService.getItems(catId)
      .subscribe(
        res=>this.itemsList = res
      )
      switch (catId) {
        case 1:
          this.dairyActive = true;
          this.meatActive= false;
          this.carbsActive= false;
          this.miscActive= false;
          break;
        case 2:
          this.dairyActive = false;
          this.meatActive= true;
          this.carbsActive= false;
          this.miscActive= false;
          break;
        case 3:
          this.dairyActive = false;
          this.meatActive= false;
          this.carbsActive= true;
          this.miscActive= false;
          break;
        case 4:
          this.dairyActive = false;
          this.meatActive= false;
          this.carbsActive= false;
          this.miscActive= true;
          break;
      
        default:
          break;
      }
  }

}
