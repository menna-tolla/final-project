import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from '../whishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[]
})
export class HomeComponent implements OnInit{
  
  inputValue:string="";
  products:Product[]=[];
  // wishListDetails:any={};
  wishListData:string[]=[]; //add and remove

constructor(private _ProductService:ProductService ,
           private _CartService:CartService,
           private _ToastrService:ToastrService,
           private _WhishlistService:WhishlistService
           ){}

//start
ngOnInit(): void {
  localStorage.setItem("lastPage" , "/home");

  //getAllProduct
this._ProductService.getAllProduct().subscribe({
  next:(response)=>
  {
    this.products=response.data;
    this._CartService.cartItemNumber.next(response.numOfCartItems);
    // console.log(this.products)
  },
  error:(err)=>
  {
    console.log(err);
  }
})

//getWishListDetales
this._WhishlistService.getWishListDetalesApi().subscribe({
  next:(response)=>{
    // console.log(response.data);
    const newData=response.data.map( (item:any)=>item._id);
    // console.log(newData);
    this.wishListData=newData;
  }
})

}

// slider 1
customOptionsSlide1: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout:3000,
  autoplaySpeed:1000,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
  
  },
  nav: true
}

//addCart
addCart(id:string):void
{
this._CartService.addToCartApi(id).subscribe({
next:(response)=>{
  // console.log(response);
  this._CartService.cartItemNumber.next(response.numOfCartItems);
  this._ToastrService.success(response.message);
},
error:(err)=>{
  console.log(err);
  this._ToastrService.warning(err.message);
}
})
}

//add wishlist
addToWishListBtn(productId:string | undefined):void
{
  this._WhishlistService.addToWishListApi(productId).subscribe({
    next:(res)=>{
      console.log(res);
      this.wishListData=res.data;
      this._ToastrService.success(res.message);
      console.log(this.wishListData);
    },
    error:(err)=>{
      console.log(err);
      this._ToastrService.warning(err.message);
    }
  })
}

//remove wishlist
removeWishListBtn(productId:string | undefined):void
{
  this._WhishlistService.removeItemApi(productId).subscribe({
    next:(res)=>{
      console.log(res);
      this.wishListData=res.data;
      this._ToastrService.success(res.message);
      console.log(this.wishListData);
    },
    error:(err)=>{
      console.log(err);
      this._ToastrService.warning(err.message);
    }
  })
}

}



