import { Injectable } from '@angular/core';
import { Http,Response,Headers} from '@angular/http'; 
import {map} from 'rxjs/operators';                          //metodo para utilizar los valores que nos devuelve una peticion ajax
import { Observable } from 'rxjs';                        //metodo para utilizar los valores que nos devuelve una peticion ajax
import { GLOBAL } from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url : string;

  constructor(private _http:Http
  ) { 
    this.url= GLOBAL.url;
  }

  makeFileRequest(url:string, params : Array<string>,files:Array<File>,token:string,name:string){
    return new Promise((resolve,reject)=>{
        var formData : any = new FormData();  //simular un formulario real
        var xhr = new XMLHttpRequest();       //xhr es un acronimo de ajax 

        for(var i= 0; i<files.length;i++){
          formData.append(name,files[i],files[i].name);  //aqui se añade los ficheros 
        }
        xhr.onreadystatechange = ()=>{
          if(xhr.readyState==4){
              if(xhr.status == 200){
                  resolve(JSON.parse(xhr.response));
              }else{
                reject(xhr.response);
              }
          }
        }
        xhr.open('POST',url,true);
        xhr.setRequestHeader('Authorization',token);
        xhr.send(formData);
    });
  }
}
