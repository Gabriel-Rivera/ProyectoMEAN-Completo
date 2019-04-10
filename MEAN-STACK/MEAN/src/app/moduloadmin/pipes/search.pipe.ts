import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, term: any): any {   //items = Listado de elementos y  term = termino de busqueda
    if(term===undefined){
      return items;
    }
     return items.filter((item)=>{
        return item.name.toLowerCase().includes(term.toLowerCase());
     });
  }

}
