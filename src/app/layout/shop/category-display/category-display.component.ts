import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ItemModalComponent } from './item-modal/item-modal.component';

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.scss']
})
export class CategoryDisplayComponent implements OnInit {
  itemsList: object[]= [];
  dairyActive: boolean = false;
  meatActive: boolean = false;
  carbsActive: boolean = false;
  miscActive: boolean = false;
  modalRef: MDBModalRef;

  constructor(
    private shopService: ShopServiceService,
    private modalService: MDBModalService
    ) {
    
  }
  openModal(item) {
    this.modalRef = this.modalService.show(ItemModalComponent)
    this.modalRef.content.name = item.name;
    this.modalRef.content.price = item.price;
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
  }

}
