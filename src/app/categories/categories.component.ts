import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
// import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit{
  
  categories:any;
  // categories:Product = { } as Product;

  constructor(private _CategoriesService:CategoriesService){};

  ngOnInit(): void {
    localStorage.setItem("lastPage" , "/categories");

    this._CategoriesService.getCategories().subscribe({
      next:(response)=>{
        this.categories=response.data;
        console.log(response);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
