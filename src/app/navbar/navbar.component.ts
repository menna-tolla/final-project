import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { BehaviorSubject } from 'rxjs';
 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin!:boolean;
  cartItemNumberNav:number=0;


  constructor(private _AuthService:AuthService , 
              private _Router:Router , 
              private _CartService:CartService){};

  ngOnInit(): void {

//all product
this._AuthService.userDataVar.subscribe(()=>{
     if(this._AuthService.userDataVar.getValue() == null)
     {
      this.isLogin=false;
     }
     else
     {
      this.isLogin=true;
     }
  })

// subscribe cart
this._CartService.cartItemNumber.subscribe({
  next:(response)=>{
    this.cartItemNumberNav=response;
      // this.cartItemNumberNav=this._CartService.cartItemNumber.getValue();
      // console.log(this.cartItemNumberNav)
  }
  })
 
//number of cart
this._CartService.getUserCart().subscribe({
  next:(response)=>{
    // console.log(response);
    this.cartItemNumberNav=response.numOfCartItems;
  },
  error:(err)=>{
    console.log(err);
  }
  })
  }


//logout
  logout()
  {
    // 1-delet localstarage
    localStorage.removeItem("userToken");
    // 2-call method => userDataVar=null 
    this._AuthService.saveDataMethod();
    // 3-rout to login
    this._Router.navigate(['/login'])
  }

}
