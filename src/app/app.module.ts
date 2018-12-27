import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Http } from '@angular/http';


import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HomepageComponent } from './layout/homepage/homepage.component';
import { LoginComponent } from './layout/login/login.component';
import { ShopComponent } from './layout/shop/shop.component';
import { HomepageService } from './services/homepage.service';
import { Configuration } from './services/configuration';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './layout/order/order.component';
import { ItemModalComponent } from './layout/shop/item-modal/item-modal.component';


const appRoutes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: '', redirectTo:"home", pathMatch:"full"},
  { path: 'shop', component: ShopComponent},
  { path: 'order', component: OrderComponent},


]
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomepageComponent,
    LoginComponent,
    ShopComponent,
    ItemModalComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot()
  ],
  entryComponents: [ LoginComponent, ItemModalComponent ],
  providers: [
    Configuration,
    HomepageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
