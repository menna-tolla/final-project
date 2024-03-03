import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(private _HttpClient:HttpClient) { };

   header:any={token:localStorage.getItem('userToken')};
  cartItemNumber:BehaviorSubject<number>=new BehaviorSubject(0);

   BaseUrl:string='https://ecommerce.routemisr.com/api/v1/'

  addToCartApi(productId:string):Observable<any>{

    return this._HttpClient.post(
    'https://ecommerce.routemisr.com/api/v1/cart' , 
    {productId:productId} , 
    {
      headers:this.header
    }
    )
  }

  updateCartApi(productId:string , countProduct:string):Observable<any>
  {
       return this._HttpClient.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: countProduct
        },
        {
          headers:this.header
        }
       )
  }

  getAllItemCartApi():Observable<any>
  {
       return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/cart",
       {
        headers:this.header
       }
       )
  }

  removeItemApi(productId:string):Observable<any>
  {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      headers:this.header
     }
    )
  }

  clearCartApi():Observable<any>
  {
     return this._HttpClient.delete("https://ecommerce.routemisr.com/api/v1/cart",
     {
      headers:this.header
     })
  }

  getUserCart():Observable<any>
  {
     return this._HttpClient.get("https://ecommerce.routemisr.com/api/v1/cart",
     {
      headers:this.header
     })
  }

  checkOut(cartId:any , orderInfo:any):Observable<any>
  {
    return this._HttpClient.post(
      `${this.BaseUrl}orders/checkout-session/${cartId}?url=http://localhost:3000` ,
     {shippingAddress:orderInfo},
     {headers:this.header})
     
  }
       
}
 