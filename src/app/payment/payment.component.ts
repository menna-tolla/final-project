import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  constructor(private _ActivatedRoute:ActivatedRoute ,
             private _Router:Router,
             private _CartService:CartService){}

  curetCartId:any;
  erMessage!:string;
  isLoding :boolean=false;


  orderForm:FormGroup=new FormGroup({ 
    details:new FormControl(null , [Validators.required]),
    email:new FormControl(null , [Validators.required , Validators.email]),
    phone:new FormControl(null ,[Validators.required , Validators.pattern(/^(01)[015][0-9]{8}$/)]),

  })

  //take id
  ngOnInit(): void {
    localStorage.setItem("lastPage" , "/payment/:id");
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.curetCartId=params.get('id');
        // console.log(this.curetCartId);
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  handleForm()
  {
    const orderData=this.orderForm.value;
    console.log(orderData);

    this._CartService.checkOut(this.curetCartId , orderData).subscribe({
     next:(res)=>{
      window.location.href=res.session.url;
      // console.log(res.session.url);
     },
     error:(err)=>{
      console.log(err);
     }
    })
  }

}
