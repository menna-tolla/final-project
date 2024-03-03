import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-slider',
  templateUrl: './categories-slider.component.html',
  styleUrls: ['./categories-slider.component.css']
})
export class CategoriesSliderComponent implements OnInit{
  allCategories:Category[]=[];

  // slider 2
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
  autoplayTimeout:3000,
  autoplaySpeed:1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      988:{
        items:8
      }
    
    },
    nav: true
  }

constructor(private _categoriesService:CategoriesService){};


ngOnInit(): void {
   this._categoriesService.getCategories().subscribe({
    next:(data)=>
    {
      // console.log(data);
      this.allCategories=data.data;
    },
    error:(err)=>
    {
      console.log(err);
    }
   })
}

}
