import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(allProducts:Product[] , userWord:string):Product[]
  {
        return allProducts.filter((onePro)=>onePro.title.toLowerCase().includes(userWord.toLowerCase()));
  }

}
