import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){}
  
  erMessage!:string;
  isLoding :boolean=false;
  forgetFlaf:boolean=true;
  verifyFlag:boolean=false;
  newPassFlag:boolean=false;

// ---------------------loginForm-------------------
loginForm:FormGroup=new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email]),
    password:new FormControl(null ,[Validators.required , Validators.pattern(/^[A-z]/)]),
  })

   // -------------*loginSubmet*-------------
loginSubmet()
   {
     this.isLoding=true;
   
       this._AuthService.loginAPI(this.loginForm.value).subscribe({
       next:(res)=>{
         this.isLoding=false;
   
         if(res.message == "success")
         {
             //1-save in localStorage
           localStorage.setItem("userToken" , res.token);
   
            //2-decode data token
           this._AuthService.saveDataMethod();
   
           //3-go to home
           this. _Router.navigate(['/home']);
           console.log("login tamam");
         }
        
       },
       error:(err)=>{
         console.log(err);
       this.erMessage=err.error.message;
       this.isLoding=false;
       }
     })
  }
      
 
  // -------------------------------------------------form------------------------------------------

// ---------------------1-forgetForm-----------------------------------

  forgetForm:FormGroup=new FormGroup({
    email:new FormControl(null , [Validators.required , Validators.email]),
   })

// ---------------------2-verifyForm------------------------------------

  verifyForm:FormGroup=new FormGroup({
  resetCode:new FormControl(null , [Validators.required]),
   })

// ---------------------3-newPasswordForm------------------------------------

   newPassword:FormGroup=new FormGroup({
  email:new FormControl(null , [Validators.required , Validators.email]),
  newPassword:new FormControl(null ,[Validators.required , Validators.pattern(/^[A-z]/)]),
   })

// -------------------------------------------------submet form------------------------------------------
    
    // -------------*forgetSubmet*-------------------

    forgetSubmet()
    {
      this.isLoding=true;
    
      this._AuthService.forgetAPI(this.forgetForm.value).subscribe({
      next:(res)=>{
        this.isLoding=false;
    
        if(res.message)   
        {
           //hide => forgetform   show=>verify
           this.forgetFlaf=false;
           this.verifyFlag=true;
           console.log("forget tamam");
        }
      },
    
      error:(err)=>{
        console.log(err);
      this.erMessage=err.error.message;
      this.isLoding=false;
      }
    })
    }
    // -------------*verifySubmet*-------------------

    verifySubmet()
    {
        this.isLoding=true;
      
        this._AuthService.verifyAPI(this.verifyForm.value).subscribe({
        next:(res)=>{
          this.isLoding=false;
      
          if(res.status =="Success")
          {
             //hide => verify   show=> newPassFlag
             console.log("verify tama")
             this.verifyFlag=false;
             this.newPassFlag=true;
             console.log("verify tamam");
            }
        },
      
        error:(err)=>{
          // console.log(err);
        this.erMessage=err.error.message;
        this.isLoding=false;
        }
      })

    }

    // -------------*verifySubmet*-------------------

  newPasswordSubmet()
  {
    this.isLoding=true;

      this._AuthService.newPasswordAPI(this.newPassword.value).subscribe({
      next:(res)=>{
        this.isLoding=false;

        if(res.token)
        {
         //to home
        this. _Router.navigate(['/home']); 
        console.log("newPasswordSubmet tamam");

        }
       
      },
      error:(err)=>{
        // console.log(err);
      this.erMessage=err.error.message;
      this.isLoding=false;
      }
    })
  }
}


