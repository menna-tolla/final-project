import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  constructor(private _CartService:CartService, private _ToastrService:ToastrService){};

  cartDetails:any={};
  cartItemNumberCart:string=" ";
  cartId:any;

  //start
  ngOnInit(): void {
    localStorage.setItem("lastPage" , "/cart");
     
    //add cart detales
    this._CartService.getUserCart().subscribe({
      next:(response)=>
      {
        // console.log(response);
        this.cartDetails=response.data;
        this.cartId=response.data._id;
        this._CartService.cartItemNumber.next(response.numOfCartItems);
      },
      error:(err)=>
      {
        console.log(err);
      }
    })
  }

  //delete item
  removeItemBtn(pid: string)
  {
    this._CartService.removeItemApi(pid).subscribe({
      next:(response)=>{
        //arrry =>data
        this.cartDetails=response.data;
        this._CartService.cartItemNumber.next(response.numOfCartItems);
        this._ToastrService.success("success remove");
      },
      error:(err)=>{
        console.log(err);
        this._ToastrService.success(err.message);
      }
    })
  }

  //clear cart
  clearBtn():void 
  {
    this._CartService.clearCartApi().subscribe({
      next:(response)=>{
        // console.log(response);
        if(response.message === "success")
        {
          this._CartService.cartItemNumber.next(response.numOfCartItems);
          this._ToastrService.success(response.message);
          this.cartDetails=null;
        }
      },
      error:(err)=>{
        this._ToastrService.success(err.message);
      }
    })
  }


  //update + -
  updateBtn(pBtn:string , pCount:string|number , pId:string)
  {
    if(pBtn == "increase")
    {
      pCount = (Number(pCount)+1).toString();
    }
    else
    {
      pCount = (Number(pCount)-1).toString();
      if( Number(pCount) == 0)
      {
        this.removeItemBtn(pId);
      }
    }

    this._CartService.updateCartApi(pId , pCount).subscribe({
      next:(response)=>{
        this.cartDetails=response.data;
        // console.log(response);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
