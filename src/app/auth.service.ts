import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

interface accountDataInterface
{
  name?:string;
  email?:string;
  password?:string;
  rePassword?:string;
  phone?:string;
  resetCode?:string;
  newPassword?:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
      
  userDataVar:BehaviorSubject<any>=new BehaviorSubject(null);  //userToken decode

  constructor(private _HttpClient:HttpClient, private _Router:Router ) {
    if(localStorage.getItem("lastPage") !=null)
    {
          _Router.navigate([localStorage.getItem("lastPage")]);
    }
   }

   //---registerAPI----
  registerAPI(rData:accountDataInterface):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , rData);
  }
   //---loginAPI----
  loginAPI(rData:accountDataInterface):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin' , rData);
  }

   //---forgetAPI----
  forgetAPI(rData:accountDataInterface):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', rData);
  }

   //---verifyAPI----
  verifyAPI(rData:accountDataInterface):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', rData);
  }

   //---newPasswordAPI----
 newPasswordAPI(rData:accountDataInterface):Observable<any>
  {
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', rData);
  }
  

  //encode data token=> all component
  saveDataMethod()
  {
    if(localStorage.getItem("userToken") != null)
    {
      //1-save data in userDataVar
      this.userDataVar.next(localStorage.getItem("userToken"));
      //2-decode token
      this.userDataVar.next(jwtDecode(this.userDataVar.getValue()));
    }
    
    else
    {
      this.userDataVar.next(null);
    }
  }

}
