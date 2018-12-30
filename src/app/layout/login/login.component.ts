import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Configuration } from 'src/app/services/configuration';
import { HomepageService } from 'src/app/services/homepage.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signupForm = this.fb.group({
    tz:['', Validators.required],
    email:['',[ Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.min(8)]],
    firstName:['', Validators.required],
    lastName:['', Validators.required],
    city:['', Validators.required],
    street:['', Validators.required]
  });
  cityList: string[];
  passConfirmed: boolean;
  errorMessage:any;
  action: Subject<any> = new Subject();


  get pass() {return this.signupForm.get('password')}
  get id() {return this.signupForm.get('tz')}
  get email() {return this.signupForm.get('email')}
  get firstName() {return this.signupForm.get('firstName')}
  get lastName() {return this.signupForm.get('lastName')}
  get city() {return this.signupForm.get('city')}
  get street() {return this.signupForm.get('street')}

  constructor(
    private fb: FormBuilder,
    public modalRef: MDBModalRef,
    private config: Configuration,
    private homeService: HomepageService
    ) { }


    checkPassword(event){
      if(event.path[0].value == this.pass.value) this.passConfirmed = true;
      else this.passConfirmed = false;
    }

    signup(){
      if(this.signupForm.invalid) return Object.keys(this.signupForm.controls).forEach(key => {
        this.signupForm.get(key).markAsTouched();
      });
      if(!this.passConfirmed) return;
      else{
        this.homeService.signup(this.signupForm.value)
          .subscribe(
            res=>{
              this.action.next(res.user);
              localStorage.setItem('token', res.token);
              this.modalRef.hide();
              this.signupForm.reset();
            },
            e=>this.errorMessage = e.error
          )
      }
    }

  ngOnInit() {
    this.cityList = this.config.CityList;
  }

}
