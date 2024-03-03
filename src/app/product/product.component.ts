import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from '../whishlist.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  
constructor(
  private _ProductService:ProductService,
  private _ToastrService:ToastrService,
  private _CartService:CartService,
  private _WhishlistService:WhishlistService
  ){};

  inputValue:string="";
  products:Product[]=[];
  wishListData:string[]=[];

  ngOnInit(): void {
    localStorage.setItem("lastPage" , "/product");

    this._ProductService.getAllProduct().subscribe({
      next:(response)=>
      {
        this.products=response.data;
        // console.log(this.products)
      },
      error:(err)=>
      {
        console.log(err)
      }
      
    })
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
addToWishListBtn(id:string):void
{
  this._WhishlistService.addToWishListApi(id).subscribe({
    next:(res)=>{
      // console.log(res);
      this._ToastrService.success(res.message);
      this.wishListData=res.data
    },
    error:(err)=>{
      console.log(err);
      this._ToastrService.warning(err.message);
    }
  })
}

//remove wishlist
removeWishListBtn(id:string):void
{
  this._WhishlistService.removeItemApi(id).subscribe({
    next:(res)=>{
      // console.log(res);
      this.wishListData=res.data
      this._ToastrService.success(res.message);
    },
    error:(err)=>{
      console.log(err);
      this._ToastrService.warning(err.message);
    }
  })
}

}
