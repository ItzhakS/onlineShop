import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemModalComponent } from '../shop/item-modal/item-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  editItemForm = this.fb.group({
    name:['', Validators.required],
    price:['', Validators.required],
    picture:[''],
    category:['', Validators.required],
  });
  searchForm= this.fb.group({
    search:['']
  });
  itemsList: object[]= [];
  dairyActive: boolean = false;
  meatActive: boolean = false;
  carbsActive: boolean = false;
  miscActive: boolean = false;
  noItems: boolean;
  itemId:number;

  get name() { return this.editItemForm.get('name'); }
  get price() { return this.editItemForm.get('price'); }
  get picture() { return this.editItemForm.get('picture'); }
  get category() { return this.editItemForm.get('category'); }


  constructor(
    private fb: FormBuilder,
    private shopService:ShopServiceService,
    private route : ActivatedRoute,
  ) { }

  saveItem(){
    if(this.editItemForm.invalid){
      this.editItemForm.controls.name.markAsTouched()
      this.editItemForm.controls.price.markAsTouched()
      this.editItemForm.controls.picture.markAsTouched()
      this.editItemForm.controls.category.markAsTouched()
    }
    else{
      if(this.itemId){
       console.log('inside', this.editItemForm)

        this.shopService.updateItem(this.editItemForm.value, this.itemId)
          .subscribe(res=>{
            this.loadItems(res.catId);
            this.itemId = null;
          });
      }
      else{
       console.log('outside', this.editItemForm)
        // return console.log(this.editItemForm.value)
        this.shopService.newItem(this.editItemForm.value)
          .subscribe(res=>{
            this.loadItems(res.catId);
          })
        }
        // this.editItemForm.reset();
    }
  }

  addNewItem(){
    this.itemId = null;
    this.editItemForm.reset();
  }
  
  openEdit(item:any){
    this.editItemForm.controls.name.setValue(item.name) 
    this.editItemForm.controls.price.setValue(item.price)
    this.editItemForm.controls.picture.setValue(item.picturePath)
    this.editItemForm.controls.category.setValue(item.catId)
    this.itemId = item.id;
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
