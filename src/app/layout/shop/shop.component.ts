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
  cartId: number=1;
  noItems: boolean;

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

}
