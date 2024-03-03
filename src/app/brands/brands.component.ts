import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})

export class BrandsComponent implements OnInit{
  constructor(private _CategoriesService:CategoriesService){};

  brands:any=[];
  ngOnInit(): void {
    localStorage.setItem("lastPage" , "/brands");

    this._CategoriesService.getBrands().subscribe({
        next:(response)=>{
        this.brands=response.data
        console.log(response);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
