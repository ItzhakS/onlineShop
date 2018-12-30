import { Component, OnInit } from '@angular/core';
import { HomepageService } from 'src/app/services/homepage.service';
import { MDBModalRef, MDBModalService  } from 'angular-bootstrap-md';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Configuration } from 'src/app/services/configuration';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  itemList: Array<object> = [];
  orderList: Array<object> = [];
  loggedIn = false;
  modalRef: MDBModalRef;
  loginForm = this.fb.group({
    email:[''],
    password:['']
  })
  get user():any{return this.config.user} 
  set user(value:any){this.config.user = value};
  shopper:any;
  noCart:boolean;
  errorMessage:string;

  constructor(
    private homeService: HomepageService,
    private modal: MDBModalService,
    public config: Configuration,
    private fb: FormBuilder,
    private router: Router
    ) { }

    openSignup(){
      this.modalRef = this.modal.show(LoginComponent);

      this.modalRef.content.action.subscribe(res=>{
        this.user = res;
        localStorage.setItem('user', this.user.tz);
        this.shopper = true;
      })
    }

    login(){
      if(this.loginForm.invalid) return Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key).markAsTouched();
      });
      else{
        this.homeService.login(this.loginForm.value)
          .subscribe(
            res=>{
              this.loggedIn =true;
              this.user = res.user;
              this.loginForm.reset();
              localStorage.setItem('user', this.user.tz);
              localStorage.setItem('token', res.token);
              this.loadLists();
              if(this.user.role==0){
                console.log(this.user)
                this.router.navigate(['../admin'],this.user.tz);
                this.shopper =false;
              }
              else{
                this.shopper = true;
              }
            },
            e=>this.errorMessage = e
          )
      }
    }

  loadLists() {
      this.homeService.getItemList()
        .subscribe(response => this.itemList = response);
      this.homeService.getOrderList()
        .subscribe(response => this.orderList = response);
    }

    enterShop(){
      this.homeService.newCart(this.user.tz)
        .subscribe(
          res=>{
            localStorage.setItem('cart', res.id)
            this.noCart = false;
            this.router.navigateByUrl('../shop')
          }
        )
    }

  ngOnInit() {
    if(!localStorage.getItem('cart')){
      this.noCart = true;
    } 
    else if(this.user && localStorage.getItem('cart')){
      this.noCart = false;
      this.shopper = true;
    } 
    this.loadLists();
  }
}
