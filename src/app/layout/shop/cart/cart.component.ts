import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  list = [
    {name:'Food'},
    {name:'Shoes'},
    {name:'Kaclee'},
    {name:'Nisht'},
    {name:'FoBarr'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
