import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from 'src/app/services/shop-service.service';

@Component({
  selector: 'app-category-display',
  templateUrl: './category-display.component.html',
  styleUrls: ['./category-display.component.scss']
})
export class CategoryDisplayComponent implements OnInit {
  itemsList: object[]= [];

  constructor(
    private shopService: ShopServiceService
    ) {
    
  }

  loadItems(e, catId){
    this.shopService.getItems(catId)
      .subscribe(
        res=>this.itemsList = res
      )
  }

  ngOnInit() {
  }

}
