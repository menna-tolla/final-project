import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ReactiveFormsModule
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{HTTP_INTERCEPTORS, HttpClientModule}from '@angular/common/http'

import {BrowserAnimationsModule}from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesSliderComponent } from './categories-slider/categories-slider.component';
import { DetailesComponent } from './detailes/detailes.component';
import { SearchPipePipe } from './search-pipe.pipe';
import { WishListComponent } from './wish-list/wish-list.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './loading.interceptor';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandsComponent,
    CartComponent,
    CategoriesComponent,
    ProductComponent,
    LoginComponent,
    FooterComponent,
    NotfoundComponent,
    NavbarComponent,
    RegisterComponent,
    CategoriesSliderComponent,
    DetailesComponent,
    SearchPipePipe,
    WishListComponent,
    PaymentComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule ,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    
  ],

  providers: [
    // {provide:HTTP_INTERCEPTORS , useClass:MyhttpInterceptor , multi:true },
    {provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
