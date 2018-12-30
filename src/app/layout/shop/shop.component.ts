import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ItemModalComponent } from './item-modal/item-modal.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  searchForm= new FormGroup({
    search: new FormControl('')
  });
  cartCollapsed = false;
  cartItemList = [];
  cartTotal: number = 0;
  itemsList: object[]= [];
  dairyActive: boolean = false;
  meatActive: boolean = false;
  carbsActive: boolean = false;
  miscActive: boolean = false;
  modalRef: MDBModalRef;
  cartId: number;
  noItems: boolean;
  cart: any;

  constructor(
    private shopService: ShopServiceService,
    private modalService: MDBModalService
  ) { }


  searchItems(){
    const str = this.searchForm.value.search;
    if(str == '') return this.itemsList = [];
    this.shopService.search(str)
      .subscribe(
        res=>{
          if(res.length==0) this.noItems = true;
          else this.noItems = false
          this.itemsList = res;
          this.dairyActive = false;
          this.meatActive= false;
          this.carbsActive= false;
          this.miscActive= false;
        }
      )
  }

  removeAllCartItems(){
    this.shopService.removeAllCartItems(this.cartId)
      .subscribe(
        res=>{
          this.cartItemList=[]
          this.cartTotal = 0;
        },
        e=>console.log(e)
      )
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

  deleteCartItem(id:number){
    this.shopService.deleteCartItem(id)
      .subscribe(res=>{
        const deletedItemIndex = this.cartItemList.findIndex(item=>item.id == res.id)
        this.cartItemList.splice(deletedItemIndex,1);
        this.cartTotal -= res.price;
      })
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

  ngOnInit() {
    this.loadItems(1);
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.cartId = this.cart.id;
    this.shopService.getCartItems(this.cartId)
      .subscribe(
        res=>{
          this.cartItemList = res;
          console.log(this.cartItemList)
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
}
