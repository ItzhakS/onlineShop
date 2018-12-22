import { Component, OnInit } from '@angular/core';
import { HomepageService } from 'src/app/services/homepage.service';
import { MDBModalRef, MDBModalService  } from 'angular-bootstrap-md';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  itemList: Array<object> = [];
  orderList: Array<object> = [];
  loggedIn = true;
  modalRef: MDBModalRef;
  loginForm = this.fb.group({
    user:[''],
    password:['']
  })

  constructor(
    private homeService: HomepageService,
    private modal: MDBModalService,
    private fb: FormBuilder
    ) { }

    openSignup(){
      this.modalRef = this.modal.show(LoginComponent);
    }
  ngOnInit() {
    this.homeService.getItemList()
      .subscribe(
        response=>this.itemList = response
      )
    this.homeService.getOrderList()
    .subscribe(
      response=>this.orderList = response
    )
  }

}
