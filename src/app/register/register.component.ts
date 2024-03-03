import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})


export class RegisterComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){}
  
  erMessage!:string;
  isLoding :boolean=false;

  registerForm:FormGroup=new FormGroup({ 
    name:new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(9)]),
    email:new FormControl(null , [Validators.required , Validators.email]),
    password:new FormControl(null ,[Validators.required , Validators.pattern(/^[A-z]/)]),
    rePassword:new FormControl(null , [Validators.required, Validators.pattern(/^[A-z]/)]),
    phone:new FormControl(null ,[Validators.required , Validators.pattern(/^(01)[015][0-9]{8}$/)]),
  } , this.compare)
 

  registerSubmet()
  {
    this.isLoding=true;

      this._AuthService.registerAPI(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.isLoding=false;

        this._Router.navigate(['/login'])
      },
      error:(err)=>{
        console.log(err);
      this.erMessage=err.error.message;
      this.isLoding=false;
      }
    })
  }

  compare(f:any)
  {
    if(f.get('password')?.value == f.get('rePassword')?.value)
    {
       return null;
    }
    else
    {
      return {matchedPassword :true}
    }
  }

}
