import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from '../whishlist.service';

@Component({
  selector: 'app-detailes',
  templateUrl: './detailes.component.html',
  styleUrls: ['./detailes.component.css']
})

export class DetailesComponent implements OnInit{
  
  constructor(
    private _CartService:CartService ,
    private _ActivatedRoute:ActivatedRoute ,
    private _ProductService:ProductService,
    private _ToastrService:ToastrService,
    private _WhishlistService:WhishlistService
  ){};

  imgsProducts:any=[];
  productDetails:Product = { } as Product;
  wishListData:string[]=[];
 
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let idProduct:any =params.get('id');

        //getProductDetales
      this._ProductService.getProductDetails(idProduct).subscribe({
        next:(response)=>{
          // console.log(response.data);
        this._CartService.cartItemNumber.next(response.numOfCartItems);
        console.log(this._CartService.cartItemNumber)
        this.productDetails=response.data;
        this.imgsProducts=response.data.images;
        this._CartService.cartItemNumber.next(response.numOfCartItems);
            // console.log(this.imgsProducts)
          },
        });

      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  // slider product
customOptions: OwlOptions = {
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

// add products
addCart(id:any):void
{
this._CartService.addToCartApi(id).subscribe({
next:(response)=>{
  // console.log(response);
  this._CartService.cartItemNumber.next(response.numOfCartItems);
  this._ToastrService.success(response.message);
},
error:(err)=>{
  console.log(err);
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
  // console.log(prodId);
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
