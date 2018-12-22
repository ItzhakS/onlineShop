import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Configuration } from 'src/app/services/configuration';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signupForm = this.fb.group({
    id:['', Validators.required],
    email:['', Validators.required],
    password:['', Validators.required],
    conPassword:['', Validators.required],
    firstName:['', Validators.required],
    lastName:['', Validators.required],
    city:['', Validators.required],
    street:['', Validators.required]
  });
  cityList: string[];

  constructor(
    private fb: FormBuilder,
    public modalRef: MDBModalRef,
    private config: Configuration
    ) { }

  ngOnInit() {
    this.cityList = this.config.CityList;
  }

}
