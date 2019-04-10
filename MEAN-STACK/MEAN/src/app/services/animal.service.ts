import { Injectable } from '@angular/core';
import { Http,Response,Headers, RequestOptions} from '@angular/http'; 
import { GLOBAL } from '../services/global';
import {map} from 'rxjs/operators'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  url:string;
  constructor(
    private _http:Http
  ) {
    this.url= GLOBAL.url;
   }


   addAnimal(token,animal){
      let params = JSON.stringify(animal);
      let headers = new Headers(
        {'Content-Type':'application/json',
        'Authorization':token});

        return this._http.post(`${this.url}save-animal`,params,{headers:headers})
        .pipe(map(res=>res.json()));
   }

   getAnimals(){      
      return this._http.get(`${this.url}list-animals`)
      .pipe(map(res=>res.json()));

   }
   getAnimal(id){      
    return this._http.get(`${this.url}animal/${id}`)
    .pipe(map(res=>res.json()));
 }

 editAnimal(token,id,animal){
    let params = JSON.stringify(animal);
    let headers = new Headers({'Content-Type':'application/json','Authorization':token});
    
    return this._http.put(`${this.url}animal/${id}`,params,{headers:headers})
        .pipe(map(res=>res.json()));
 }

 deleteAnimal(token,id){
    let headers = new Headers({'Content-Type':'application/json','Authorization':token});

    let options = new RequestOptions({headers:headers});

    return this._http.delete(`${this.url}animal/${id}`,options)
        .pipe(map(res=>res.json()));                                
 }

}
