import { Component, OnInit } from '@angular/core';
import { WhishlistService } from '../whishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})

export class WishListComponent implements OnInit{

  constructor(private _WhishlistService:WhishlistService , 
              private _ToastrService:ToastrService,
              private _CartService:CartService){};
              
  products:Product[]=[]
  wishListDetails:string[]=[];


  //start
ngOnInit(): void {
      
      this._WhishlistService.getWishListDetalesApi().subscribe({
        next:(response)=>{
          console.log(response);
          this.products=response.data
          // this.wishListDetails=response.data;
          // this._WhishlistService.wishListData=this.wishListDetails.id;
          this._CartService.cartItemNumber.next(response.numOfCartItems);
        },
        error:(err)=>{console.log(err)}
      })
    
    
  }

  //addCart
addCart(id:any):void
{
this._WhishlistService.addToCartApi(id).subscribe({
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

// remove cart
removeItemBtn(productId: string | undefined):void
  {
    this._WhishlistService.removeItemApi(productId).subscribe({
      next:(response)=>{
        console.log(response);
        //arrry =>data
        this.products=response.data;
        this._ToastrService.success(response.status);
      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.success(err.status);
      }
    })
  }


  
}
