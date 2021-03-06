import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AdminComponent } from './layout/admin/admin.component';
import { AuthGaurdGuard } from './auth-gaurd.guard';
import { AdminGuard } from './admin.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';


const appRoutes: Routes = [
  {path: 'home', component: HomepageComponent},
  {path: '', redirectTo:"home", pathMatch:"full"},
  { path: 'shop', component: ShopComponent, canActivate: [AuthGaurdGuard]},
  { path: 'order', component: OrderComponent, canActivate: [AuthGaurdGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  { path: "**", redirectTo: "home"}
// 

]
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomepageComponent,
    LoginComponent,
    ShopComponent,
    ItemModalComponent,
    OrderComponent,
    AdminComponent
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
    HomepageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
