import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';
import { DetailesComponent } from './detailes/detailes.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path:'' ,redirectTo:'home', pathMatch:"full"},
  {path:"register" , component:RegisterComponent},
  {path:"login" , component:LoginComponent},
  {path:"home" , canActivate:[authGuard], component:HomeComponent},
  {path:"brands" ,canActivate:[authGuard],component:BrandsComponent},
  {path:"categories",canActivate:[authGuard], component:CategoriesComponent},
  {path:"cart",canActivate:[authGuard], component:CartComponent},
  {path:"wishList" , canActivate:[authGuard] , component:WishListComponent},
  {path:"product",canActivate:[authGuard], component:ProductComponent},
  {path:"detailes/:id", canActivate:[authGuard],component:DetailesComponent},
  {path:"payment/:id" , canActivate:[authGuard] , component:PaymentComponent},
  {path:"**" ,component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
