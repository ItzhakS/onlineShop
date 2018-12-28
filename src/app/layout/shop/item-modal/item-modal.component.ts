import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { FormBuilder, Validators } from '@angular/forms';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss']
})
export class ItemModalComponent implements OnInit {
  action: Subject<any> = new Subject();
  itemForm = this.fb.group({
    amount: [0, [Validators.required, Validators.min(1)]]
  })
  cartId:number;
  id:number;

  constructor(
    public itemModal: MDBModalRef,
    private fb: FormBuilder,
    private shopService: ShopServiceService
    
    ) { }

    saveCartItem(){
      console.log(this.itemForm.value.amount)
      let total = this.itemForm.value.amount * this.itemModal.content.price;
      const item = {
        itemId: this.id,
        name: this.itemModal.content.name,
        price: this.itemModal.content.price,
        cartId: this.cartId,
        amount: this.itemForm.value.amount,
        total: total
      }
      this.shopService.postCartItem(item)
        .subscribe(
          res=>{
            console.log(res)
            this.action.next(res);
            this.itemModal.hide()
          }
        )
    }

  ngOnInit() {
  }

}
