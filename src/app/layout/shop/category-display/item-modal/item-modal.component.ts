import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss']
})
export class ItemModalComponent implements OnInit {
  itemForm = this.fb.group({
    amount: [0]
  })

  constructor(
    public itemModal: MDBModalRef,
    private fb: FormBuilder
    ) { }

    saveCartItem(){

    }

  ngOnInit() {
  }

}
