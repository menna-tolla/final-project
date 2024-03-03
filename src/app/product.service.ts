import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  constructor(private _HttpClient:HttpClient) { }

  // AllProduct
getAllProduct():Observable<any>
{
  return (this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products'));
}

// product detailes
getProductDetails(id:string):Observable<any>
{
  return (this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`));
}

}
