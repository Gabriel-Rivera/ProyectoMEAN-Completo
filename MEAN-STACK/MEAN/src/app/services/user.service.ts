import { Injectable } from '@angular/core';
import { Http,Response,Headers} from '@angular/http'; 
import { GLOBAL } from '../services/global';
import {map} from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string;
  identity;
  token;

  constructor(
      private _http:Http
  ) { 
    this.url = GLOBAL.url;
  }
  register(user_to_register){
    let params = JSON.stringify(user_to_register);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(`${this.url}register`,params,{headers:headers})
      .pipe(map(res => res.json()));
  }

  signup(user_to_login,gettoken = null){

    if(gettoken != null){
      user_to_login.gettoken= gettoken;
      }

    let params = JSON.stringify(user_to_login);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(`${this.url}login`,params,{headers:headers})
      .pipe(map(res => res.json()));
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != 'undefined' ){
      this.identity =identity;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');

    if(token != 'undefined' ){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  updateUser(user_to_update){
    let params = JSON.stringify(user_to_update);
    let headers = new Headers({
      'Authorization':this.getToken(),
      'Content-Type':'application/json'
    });
      
    return this._http.put(`${this.url}update-user/${user_to_update._id}`,params,{headers:headers})
        .pipe(map(res => res.json()));
  }
  getKeepers(){
    return this._http.get(`${this.url}get-keepers`)
      .pipe(map(res=>res.json()));
  }


}
