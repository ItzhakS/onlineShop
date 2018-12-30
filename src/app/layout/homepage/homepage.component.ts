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
  admin: boolean;
  get user():any{return this.config.user} 
  set user(value:any){this.config.user = value};
  shopper:boolean = false;
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
        this.loggedIn =true;
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
                if(localStorage.getItem('cart')){
                  let cart = JSON.parse(localStorage.getItem('cart'))
                  if(cart.userId == this.user.tz)this.noCart = false;
                  else localStorage.removeItem('cart');
                }
                this.shopper = true;
              }
            },
            e=>{
              console.log(e)
              this.errorMessage = e.error
            }
          )
      }
    }

    logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.loggedIn=false;
      this.user = null;
      this.shopper = null;
      this.admin = false;
      
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
            localStorage.setItem('cart', JSON.stringify(res))
            this.noCart = false;
            this.router.navigate(['../shop'])
          }
        )
    }

  ngOnInit() {
    if(localStorage.getItem('user') && localStorage.getItem('token')){
      let userId = parseInt(localStorage.getItem('user'));
      this.homeService.getUser(userId)
        .subscribe(
          user=>{
            this.loggedIn =true;
            this.user = user[0];
            if(this.user.role!=0)this.shopper = true;
            else{
              this.shopper = false;
              this.admin = true;
            }
            if(!localStorage.getItem('cart')){
              this.noCart = true;
            } 
            else if(localStorage.getItem('cart')){
              let cart = JSON.parse(localStorage.getItem('cart'))
              if(cart.userId == this.user.tz)this.noCart = false;
            }
          })
    }

    this.loadLists();
  }
}
