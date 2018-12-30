import { Component, OnInit } from '@angular/core';
import { Configuration } from '../services/configuration';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  get user():any{return this.config.user} 

  constructor(
    public config: Configuration
  ) { }

  ngOnInit() {
  }

}
