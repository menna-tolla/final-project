import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WhishlistService {

  constructor(private _HttpClient:HttpClient) { };
  BaseUrl:string='https://ecommerce.routemisr.com/api/v1/';
  header:any={token:localStorage.getItem('userToken')};
  // cartItemNumber:BehaviorSubject<any>=new BehaviorSubject(null);
    wishListData:string[]=[];


  //add to wishlist
  addToWishListApi(productId:string | undefined):Observable<any>{
     return this._HttpClient.post(`${this.BaseUrl}wishlist`,
    {productId:productId} , 
    {headers:this.header}
    );
  }


  //delete 
removeItemApi(productId:string | undefined):Observable<any>
{
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
  {
    headers:this.header
   }
  )
}

  //get to wishlist
  getWishListDetalesApi():Observable<any>{
    return this._HttpClient.get(`${this.BaseUrl}wishlist`,
    {headers:this.header}
   );
 }

 //add to cart 
 addToCartApi(productId:string):Observable<any>{

  return this._HttpClient.post(
  'https://ecommerce.routemisr.com/api/v1/cart' , 
  {productId:productId} , 
  {
    headers:this.header
  }
  )
}


}
